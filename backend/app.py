import datetime
import json
import random
import secrets

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
)
from flask_migrate import Migrate
from flask_restx import Api, Resource
from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    MetaData,
    String,
    Table,
    Text,
)
from werkzeug.security import check_password_hash

from db_setup import db
from models import Message, Quipu, User

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:1212@localhost/mywork"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SERVER_NAME"] = "localhost:8080"
# app.config["SECRET_KEY"] = "your-secret-key"  # JWT 토큰 생성에 필요한 비밀 키

SECRET_KEY = "my_secret_key"

db.init_app(app)

migrate = Migrate(app, db)


api = Api(app, doc="/swagger")  # Flask 객체에 Api 객체 등록


def create_message_table(user_id):
    """유저별 메시지 테이블 동적 생성 함수."""
    table_name = f"messages_user_{user_id}"

    # 테이블이 이미 존재하면 그것을 return
    if db.engine.dialect.has_table(db.engine, table_name):
        return Table(table_name, db.metadata, autoload_with=db.engine)

    # 없으면 새로 생성
    table = Table(
        table_name,
        db.metadata,
        Column("memo_id", Integer, primary_key=True, autoincrement=True),
        Column("content", Text, nullable=False),
        Column("writer_id", Integer, ForeignKey("users.id"), nullable=False),
        Column("choiceType", String(50), nullable=False),
        Column("created_at", DateTime, default=datetime.now),
        Column("updated_at", DateTime, default=datetime.now, onupdate=datetime.now),
    )
    table.create(db.engine)
    return table


def create_message(user_id, content, writer_id, choice_type):
    # 테이블이 이미 생성되어 있으니 해당 테이블에 메시지 삽입
    table_name = f"user_{user_id}_messages"

    # 테이블 객체를 가져온다
    try:
        table = Table(table_name, db.metadata, autoload_with=db.engine)
    except Exception as e:
        return jsonify({"error": f"테이블을 로드하는데 실패했습니다: {str(e)}"}), 500

    # 동적으로 생성된 테이블에 메시지 삽입
    try:
        # 테이블에 데이터 삽입
        db.session.execute(
            table.insert().values(
                content=content,
                writer_id=writer_id,
                choiceType=choice_type,
                created_at=datetime.now(),
                updated_at=datetime.now(),
            )
        )
        db.session.commit()

        return (
            jsonify(
                {
                    "status": "success",
                    "message": "메시지가 성공적으로 작성되었습니다.",
                }
            ),
            201,
        )
    except Exception as e:
        # 오류 발생 시 롤백
        db.session.rollback()
        return jsonify({"error": f"메시지 작성 중 오류가 발생했습니다: {str(e)}"}), 500


@api.route("/register")
class Register(Resource):
    def post(self):
        data = request.get_json()

        name = data.get("name")
        studentID = data.get("studentID")
        password = data.get("password")
        choiceType = data.get("choiceType")
        topic = data.get("topic", None)

        if not name or not studentID or not password or not choiceType:
            return jsonify({"error": "모든 필수 값을 입력해주세요."}), 400

        # quipu 데이터베이스에서 studentID 확인
        quipu_student = Quipu.query.filter_by(studentID=studentID).first()
        if not quipu_student:
            return (
                jsonify(
                    {"error": "해당 학번이 quipu 데이터베이스에 존재하지 않습니다."}
                ),
                400,
            )

        if User.query.filter_by(studentID=studentID).first():
            return jsonify({"error": "이미 등록된 학번입니다."}), 400

        new_user = User(
            username=name,
            studentID=studentID,
            password=password,
            choiceType=choiceType,
            topic=topic,
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            create_message_table(new_user.id)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"회원가입 중 오류가 발생했습니다: {str(e)}"}), 500

        return jsonify({"message": "회원가입이 완료되었습니다."}), 201

    def get(self):
        return jsonify({"error": "Methods Error"}), 405


@api.route("/register/quipuCheck")
class Check(Resource):
    def post(self):

        data = request.get_json()
        studentID = data.get("studentID")

        if not studentID:
            return jsonify({"error": "학번을 입력하세요."}), 400

        # 학번이 데이터베이스에 있는지 확인
        student = Quipu.query.filter_by(studentID=studentID).first()

        if student:
            return jsonify({"exists": True, "message": "학번이 존재합니다."}), 200
        else:
            return (
                jsonify({"exists": False, "message": "학번이 존재하지 않습니다."}),
                404,
            )


@api.route("/login")
class Login(Resource):
    def post(self):
        data = request.get_json()

        studentID = data.get("studentID")
        password = data.get("password")

        if not studentID or not password:
            return jsonify({"error": "모든 필수 값을 입력해주세요."}), 400

        existing_user = User.query.filter_by(studentID=studentID).first()

        if not existing_user:
            return jsonify({"error": "가입되지 않은 회원입니다."}), 400

        if not check_password_hash(existing_user.password, password):
            return jsonify({"error": "비밀번호가 일치하지 않습니다."}), 400

        access_token = create_access_token(identity=existing_user.id)

        return (
            jsonify(
                {
                    "status": "success",
                    "message": "로그인 성공",
                    "name": existing_user.username,
                    "choiceType": existing_user.choiceType,
                    "token": access_token,
                }
            ),
            200,
        )

    def get(self):
        return (jsonify({"error": "Methods Error"}), 405)


@api.route("/myStore/<int:userID>")
class MyStore(Resource):
    @jwt_required()
    def get(self, userID):

        # 현재 로그인한 사용자의 ID를 가져옴
        current_user_id = get_jwt_identity()

        # 로그인한 사용자의 ID와 요청된 userID가 일치하는지 확인
        if current_user_id != userID:
            return (
                jsonify(
                    {
                        "status": "fail",
                        "message": "로그인한 사용자만 본인의 정보를 확인할 수 있습니다.",
                    }
                ),
                403,
            )

        user = User.query.filter_by(id=userID).first()

        if not user:
            return (
                jsonify(
                    {
                        "status": "fail",
                        "message": f"User with ID {userID} not found.",
                        "data": None,
                    }
                ),
                404,
            )

        return (
            jsonify(
                {
                    "status": "success",
                    "message": f"MyStore for userID {userID}",
                    "data": {
                        "username": user.username,
                        "choiceType": user.choiceType,
                    },
                }
            ),
            200,
        )


@api.route("/store/<int:userID>")
class Store(Resource):
    def get(self, userID):

        user = User.query.filter_by(id=userID).first()

        if not user:
            return (
                jsonify(
                    {
                        "status": "fail",
                        "message": f"User with ID {userID} not found.",
                        "data": None,
                    }
                ),
                404,
            )

        return (
            jsonify(
                {
                    "status": "success",
                    "message": f"Store for userID {userID}",
                    "data": {
                        "username": user.username,
                        "choiceType": user.choiceType,
                    },
                }
            ),
            200,
        )


# @api.route("/store/<int:userID>/select")
# class MyStoreSelect(Resource):
# def get(self, userID):
# return {"message": f"Select store for userID {userID}"}


@api.route("/store/<int:userID>/write/<string:type>")
class StoreWrite(Resource):
    def post(self, userID, type):

        current_user_id = get_jwt_identity()

        data = request.get_json()
        content = data.get("content")

        if not content:
            return jsonify({"error": "내용을 입력하세요."}), 400

        # 유저별 메시지 테이블에 데이터 삽입
        try:
            user = User.query.get(userID)
            if not user:
                return jsonify({"error": "유저를 찾을 수 없습니다."}), 404

            # 유저별 메세지 테이블 유무 확인
            create_message_table(userID)

            # 동적으로 생성된 테이블에 메시지 추가
            result = create_message(userID, content, current_user_id, type)
            if result[1] != 201:
                return result  # 오류 메시지 반환

            # 새로운 메시지 ID 가져오기
            new_message_id = result[0].get("status")
        except Exception as e:
            db.session.rollback()
            return (
                jsonify({"error": f"메시지 작성 중 오류가 발생했습니다: {str(e)}"}),
                500,
            )

        return {
            "status": "success",
            "message": f"{type} 쪽지가 성공적으로 작성되었습니다.",
            "data": {
                "memo_id": new_message_id,
                "writer_id": current_user_id,
                "content": content,
                "choiceType": type,
            },
        }, 201


@api.route("/myStore/<int:userID>/read/<string:postID>")
class MyStoreRead(Resource):
    def get(self, userID, postID):

        message = Message.query.filter_by(id=postID, user_id=userID).first()

        # 쪽지가 존재하지 않는 경우
        if not message:
            return (
                jsonify({"status": "error", "message": "쪽지를 찾을 수 없습니다."}),
                404,
            )

        return (
            jsonify(
                {
                    "status": "success",
                    "data": {
                        "postID": message.id,
                        "writer": message.writer,
                        "content": message.content,
                        "choiceType": message.choice_type,
                    },
                }
            ),
            200,
        )


@api.route("/allStore")
class AllStore(Resource):
    def get(self):

        users = User.query.all()

        store_list = [{"userid": user.id, "username": user.username} for user in users]

        random_user = random.choice(users)

        return (
            jsonify(
                {
                    "status": "success",
                    "data": {
                        "store_list": store_list,
                        "random_user": {
                            "userid": random_user.id,
                            "username": random_user.username,
                        },
                    },
                }
            ),
            200,
        )


def save_swagger_spec():
    with app.app_context():
        with open("swagger.json", "w") as f:
            json.dump(api.__schema__, f, indent=4)


if __name__ == "__main__":
    save_swagger_spec()
    app.run(host="127.0.0.1", port=8080, debug=True)
