# Netfilx Clone : Backend
- Prisma + GraphQL + Node.js를 활용하여 Netfilx를 Cloning!

## TO-DO
    1. Prisma Datamodel 작성하기
    2. GraphQL API 만들기

### 1. Prisma Datamodel 작성하기
    1-1. User
        - userName : email의 @ 이전 문자 사용 (e.g. sjly3k@naver.com 이면, userName은 sjly3k)
        - password : JWT 사용해보기
    2-1. 만들어야 할 API들
        - Sign Up
        - Login
        - Logout
        - Profile
        - 전체 영화, 드라마 목록 보여주기
        - 유저 별 좋아하는 영화, 드라마 목록 보여주기
        - 전체 영화, 드라마에 대한 Detail 보여주기
            - 제목
            - 시놉시스
            - 장르
            - 등장 배우 등
        