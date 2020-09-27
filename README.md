# Netfilx Clone : Backend
- Prisma + GraphQL + Node.js를 활용하여 Netfilx를 Cloning!

## TO-DO
    1. Prisma Datamodel 작성하기
    2. GraphQL API 만들기

### 1. Prisma Datamodel 작성하기
    1-1. User
        - userName : email의 @ 이전 문자 사용 (e.g. sjly3k@naver.com 이면, userName은 sjly3k)
        - password : JWT 사용해보기 + bcrypt 이용해서 사용자 입력 암호 암호화하기
        
### 2. GraphQL API 만들기
    2-1. 만들어야 할 API들
            - Sign Up -> OK (createAccount)
            - Login -> OK (Login)
            - Logout
            - Profile -> OK (me)
            - 전체 영화, 드라마 목록 보여주기 -> OK 
            - 유저 별 좋아하는 영화, 드라마 목록 보여주기 -> OK (like linking으로 보여주면 됨)
            - 전체 영화, 드라마에 대한 Detail 보여주기 -> OK (seeFullContent)
                - 제목
                - 시놉시스
                - 장르
                - 등장 배우 등
            - 컨텐츠에 Like 누르기 -> OK (toggleLike)
            - 배우 이름이나, 컨텐츠 명으로 검색 -> (searchContent, searchActor)
            
### 3. 개선하기
    3-1. Episode 모델의 content title과, Episode title 두개 Multi Constraint 걸기
        