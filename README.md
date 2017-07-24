# Schema

>> user 

> name : String

> id : String

> password : String

> token : String

> tag : String



>> friends

> token : String

> list : Array

> result : Array



>> battle

> user1Name : String

> user2Name : String

> user1Data : String

> user2Data : String

> receive : String

> winner : String

> loser : String

> reward : String

> target : String

> battleText : String

> roomToken : String

# Query :/GET

>>> /battle/check?name="유저 이름"

>> require

> name : 유저 이름

>> response

> Success : username : 상대방 유저 이름

> No Data : Server code 404

>>> /friend/getToken?token="유저 토큰"

>> require

> token : 유저 토큰

>> response

> Success : Array

> Fail : Server code 404



# Query :/POST

>>> /auth/login

>> require 

> id : 유저 아이디

> password : 유저 비밀번호

>> response

> token : 유저 토큰

>>>  /auth/signup

>> require 

> name : 유저 이름

> id : 유저 아이디

> password : 유저 비밀번호

>> response

> token : 유저 토큰


>>> /auth/updateName

>> require

> token : 유저 토큰

> name : 유저 이름

>> response

> Success : Server code 200

> Fail Or Not Found : Server Code 503

>>> /battle/setRoom

>> require

> user1Name : 유저 1 이름

> user2Name : 유저 2 이름

> reward : 경쟁 보상

> target : 경쟁 목표

> battleText : 현피 텍스트

>> response

> Server code 200

>>> /battle/recieve

>> require

> name : 유저 이름

>> response

> Success : Server code 200

> Fail or Not Found : Server code 404

>>> /battle/userUpdate

>> require

> name : 유저 이름

> data : 유저 운동량

>> response

> Success : Server code 200

> Fail or Not Found : Server code 503

>>> /battle/finish

>> require

> name : 유저 이름

> winner : 승리한사람

> loser : 패배한사람

>> response

> Success : server code 200

> Fail or Not found : 404

>>> /friend/addFriend

>> require

> token : 유저 토큰

> name : 친구 이름

>> response

> Success : Server code 200

> Fail : Server Code 503