from datetime import datetime
import json
import random
import secrets

from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify, Response
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
from models import Quipu, User, Message
from flasgger import Swagger
from sqlalchemy import inspect, select

load_dotenv()

app = Flask(__name__)

app.config["JSON_AS_ASCII"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SERVER_NAME"] = os.getenv("SERVER_NAME")
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

db.init_app(app)

migrate = Migrate(app, db)

api = Api(app, doc="/swagger")  # Flask 객체에 Api 객체 등록
swagger = Swagger(app, template_file="./swagger.json")
jwt = JWTManager(app)

def custom_response(data, status_code=200):
    response = json.dumps(data, ensure_ascii=False).encode("utf-8")
    return Response(response, content_type="application/json; charset=utf-8", status=status_code)

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
            return custom_response({"error": "모든 필수 값을 입력해주세요."}, 400)

        # quipu 데이터베이스에서 studentID 확인
        quipu_student = Quipu.query.filter_by(studentID=studentID).first()
        if not quipu_student:
            return custom_response(
                    {"error": "해당 학번이 quipu 데이터베이스에 존재하지 않습니다."}
                ,
                400,
            )

        else:
            if User.query.filter_by(studentID=studentID).first():
                return custom_response({"error" : "이미 존재하는 학번입니다."},400)
            new_user = User(
                username=name,
                studentID=studentID,
                choiceType=choiceType,
                topic=topic,
            )
            new_user.password = password
            new_user.set_nickname()
            try:
                db.session.add(new_user)
                db.session.commit()
                return custom_response({"message": "회원가입이 완료되었습니다."}, 201)

            except Exception as e:
                db.session.rollback()
                return custom_response({"error": f"회원가입 중 오류가 발생했습니다: {str(e)}"}, 500)


@api.route("/login")
class Login(Resource):
    def post(self):
        data = request.get_json()

        studentID = data.get("studentID")
        password = data.get("password")

        if not studentID or not password:
            return custom_response({"error": "모든 필수 값을 입력해주세요."}, 400)

        existing_user = User.query.filter_by(studentID=studentID).first()
        if not existing_user:
            return custom_response({"error": "가입되지 않은 회원입니다."}, 400)

        if not existing_user.verify_password(password):
            return custom_response({"error": "비밀번호가 일치하지 않습니다."}, 400)

        access_token = create_access_token(identity=existing_user.id)

        result = {
            "status": "success",
            "message": "로그인 성공",
            "name": existing_user.username,
            "choiceType": existing_user.choiceType,
            "token": access_token,
        }
        return custom_response(result, 200)


@api.route("/store/<int:userID>")
class Store(Resource):
    @jwt_required()
    def get(self, userID):
        current_user_id = get_jwt_identity()
        user = User.query.filter_by(id=userID).first()
        loginUser = User.query.filter_by(id=current_user_id).first()
        if not user:
            return custom_response({"error": f"User with ID {userID} not found."}, 404)

        messages = Message.query.filter_by(receiver=userID).all()
        choiceCounts = {"A" : 0, "B" : 0, "C" : 0, "D" : 0}
        for message in messages:
            choice = message.choiceType
            if choice in choiceCounts:
                choiceCounts[choice] += 1
            else:
                return custom_response({"error" : f"unknown choice"}, 404)
        if userID == current_user_id:
            result = {
                "status" : "success",
                "message" : f"my store : {userID}",
                "data" : {
                    "username" : user.username,
                    "choiceType" : user.choiceType,
                    "coin" : user.coin,
                    "memoChoiceCount" : choiceCounts
                }
            }
            return custom_response(result, 200)
        result = {
                    "status": "success",
                    "message": f"Store for userID {userID}",
                    "data": {
                        "loginUser" : loginUser.username, 
                        "username": user.username,
                        "choiceType": user.choiceType,
                        "coin" : user.coin,
                        "memoChoiceCount" : choiceCounts 
                    },
                }
        return custom_response(result, 200)

@api.route("/store/<int:userID>/write/<string:type>")
class StoreWrite(Resource):
    @jwt_required()
    def post(self, userID, type):

        current_user_id = get_jwt_identity()

        data = request.get_json()
        content = data.get("content")
        if userID == current_user_id:
            return custom_response({"error": "본인의 가게에는 쪽지를 작성할 수 없습니다."}, 400)
        if not content:
            return custom_response({"error": "내용을 입력하세요."}, 400)

        # 유저별 메시지 테이블에 데이터 삽입
        # user : /store/<int:userID>의 주인
        # loginUser : 로그인 한 유저
        try:
            user = db.session.get(User, userID)
            # loginUser = db.session.get(User, current_user_id)
            if not user:
                return custom_response({"error": "유저를 찾을 수 없습니다."}, 404)
            messages_count = Message.query.filter_by(receiver=user.id).count()

            if messages_count>=9:
                return custom_response({
                    "error": "상대방의 쪽지 리스트가 꽉 찼습니다. 상대방이 쪽지를 읽어야 추가로 쪽지를 보낼 수 있습니다."
                }, 400)

            #쪽지 생성
            new_message = Message(
                content =content,
                sender = current_user_id,
                choiceType = type,
                receiver = userID
            )
            db.session.add(new_message)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return custom_response(
                {"error": f"메시지 작성 중 오류가 발생했습니다: {str(e)}"},
                500,
            )

        return custom_response({
            "status": "success",
            "message": f"{type} 쪽지가 성공적으로 작성되었습니다.",
            "data": {
                "memo_id": new_message.memo_id,
                "sender": current_user_id,
                "receiver" : userID,
                "content": content,
                "choiceType": type,
            },
        }, 201)


@api.route("/store/<int:userID>/read/<int:postID>")
class MyStoreRead(Resource):
    @jwt_required()
    def get(self, userID, postID):
        #현재 로그인한 사용자의 ID 가져옴
        current_user_id = get_jwt_identity()
        if current_user_id != userID:
            return custom_response(
                {"error" : "권한이 없습니다. 다른 사용자의 메시지를 읽을 수 없습니다."}, 403
            )
        
        #메시지 가져오기
        message = db.session.get(Message, postID)
        if not message:
            return custom_response({"error": "쪽지를 찾을 수 없습니다."}, 404)
        sender = db.session.get(User, message.sender)
        if not sender:
            return custom_response({"error": "보낸 사람 정보를 찾을 수 없습니다."}, 500)
        
        # 코인 지급: 보낸 사람에게 500 코인 추가
        sender.coins = getattr(sender, "coins", 0) + 500

        # 쪽지 삭제
        db.session.delete(message)
        db.session.commit()


        # 결과 반환
        return custom_response(
            {
                "status": "success",
                "message": f"쪽지를 읽었습니다. {message.sender}님에게 500코인이 지급되었습니다.",
                "data": {
                    "memo_id": message.memo_id,
                    "sender": message.sender,
                    "receiver": message.receiver,
                    "content": message.content,
                    "choiceType": message.choiceType,
                },
            },
            200,
        )




@api.route("/all-store")
class AllStore(Resource):
    @jwt_required()
    def get(self):

        users = User.query.all()
        # 사용자가 없을 경우 처리
        if not users:
            return custom_response(
                {"error": "사용자가 없습니다."},
                404,
            )
        # 모델 객체를 딕셔너리로 변환
        store_list = [
            {"userID" : user.id, "username" : user.username, "type" : user.choiceType}
            for user in users
        ]
        return custom_response(
                {
                    "status": "success",
                    "data": {
                        "store_list": store_list,
                    },
                },
            200,
        )


def save_swagger_spec():
    with app.app_context():
        with open("swagger.json", "w") as f:
            json.dump(api.__schema__, f, indent=4)


if __name__ == "__main__":
    # save_swagger_spec()
    app.run(host="0.0.0.0", port=5000, debug=True)
