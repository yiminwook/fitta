<h2>Node -v 18.13.0</h2>

프론트 Local구동방법

1. node.js v18.13.0 설치
2. git clone git@github.com:yiminwook/fitta.git
3. git switch dev //dev branch 이동
4. 파일 가장 바깥위치에 .env 파일 생성
5. yarn install //node_modules 설치
6. yarn dev //locahost:3000서버 구동

```

> env

REACT_APP_SITE_URL=http://localhost:3000
REACT_APP_SERVER_URL=http://localhost:8081
REACT_APP_KAKAO_JAVASCRIPT_KEY=
REACT_APP_GOOGLE_API_KEY=

```
