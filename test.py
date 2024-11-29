#테스트용
import requests

#퀴푸 회원 체크
url = "http://localhost:5000/register/quipuCheck"

res = requests.post(url, json = {"studentID" : "1111111111"})
print(res.json())

#회원가입
url2 ="http://localhost:5000/register"
jsonData = {"name" : "test2", "studentID" : "2222222222", "password" : "minnnjuuu", "choiceType" : "B"}
res2 = requests.post(url2, json = jsonData)
print(res2.json())

#로그인
url3 ="http://localhost:5000/login"
jsonData2 = {'studentID' : '2222222222', 'password' : 'minnnjuuu'}
res3 = requests.post(url3, json=jsonData2)
token = res3.json()['token']
print(token)

headers = {"Authorization" : f"Bearer {token}"}

#나의 붕어빵 가게
url4 = "http://localhost:5000/myStore/34"
res4 = requests.get(url4, headers=headers)
print(res4.json())


#남이 본 나의  붕어빵 가게
url5 = "http://localhost:5000/store/34"
res5 = requests.get(url5, headers=headers)
print(res5.json())

#붕어빵 쪽지 쓰기
url6 = "http://localhost:5000/store/33/write/D"
jsonData3 = {"content" : "plz!!!"}
res6 = requests.post(url6,json=jsonData3, headers=headers)
print(res6.json())

#내 붕어빵 가게 쪽지 보기
url7 = "http://localhost:5000/myStore/33/read/2"
res7 = requests.get(url7, headers = headers)
print(res7.json())

#붕어빵 가게 조회
url8 = "http://localhost:5000/allStore"
res8 = requests.get(url8, headers = headers)
print(res8.json())