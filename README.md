
# 스벨트(Svelte) 상태 시퀀스 관리

  

# 목표
html에서 보여지는 값을 조작하고자 하였다.

자바스크립트를 기준으로, 상태관리를 하고자 하였고, 기준점은html로 잡았다.

# 개요

유저의 정보에 따라서, 찾고자 하는 데이터 유무를 화면에 동그라미의 원의 색상과 문구로 표현했다.

또한, 찾고자 하는 데이터의 부재시, 다른 페이지로 넘어가서, 데이터를 입력, 수정 및 삭제 기능을 수행할 수 있게 하였으며, 성공/ 실패 시에 화면의 동그라미 원의 색상과 문구로 각 표시하게 하였다.

당연한 말이지만, 해당 기능을 수행하는 동안은 백엔드가 실행되고 있어야한다.

자세한 사항은 백엔드, 자바스크립트 프론트엔드의 깃허브 리드미에도 기재해놓았다.
  
backend 깃허브:
[https://github.com/Yeo616/Sequence_backend_FastAPI](https://github.com/Yeo616/Sequence_backend_FastAPI)

  

스벨트 프론트엔드 깃허브:

[https://github.com/Yeo616/Svelte_sequence](https://github.com/Yeo616/Svelte_sequence)

  

## 온라인에서 실행



  

## 구현한 기능

- 사용자 이메일 확인 및 찾고자 하는 데이터 여부 확인
- 데이터가 없을 경우, 입력하여 DB에 저장
- 데이터가 있을 경우, 수정하여 DB에 업데이트
- 다른 페이지로 넘어가기
- 기존에 존재하던 데이터 삭제


# 사전 준비
해당 프로젝트의 원활한 실행을 위해서는 back-end 프로젝트가 실행되어야한다.

backend 깃허브:
[https://github.com/Yeo616/Sequence_backend_FastAPI](https://github.com/Yeo616/Sequence_backend_FastAPI)

# 시작하기
visual Studio Code에서 Svelte for VS Code 익스텐션 설치

## 스벨트 실행
Node.js가 설치되어있다면 아래 명령어로 설치한다.
```
npx degit sveltejs/template svelte-sequence
```
  
degit 패키지에 두개의 파라미터가 필요하다. 하나는 깃허브에 미리 작성되어 있는 스벨트 프로젝트(sveltejs/template)이름이고, 두 번째는 로컬에 생성될 프로젝트 폴더명이다.
-> degit는 현재 위치에서 지정한 폴더명이름으로 하위 폴더를 생성하고, sveltejs/template를 clone해서, 지정한 폴더명에 설치한다.


프로젝트 폴더로 이동하여, 관련 패키지 설치
```
npm install
```
  

실행
```
npm run dev
```
  

## 폴더구조

![](https://lh4.googleusercontent.com/Nk90fcCHdqAWbx4qSqf-Kh_OSJFnrTcrveTHqHD6QZO3KJBEtZmq-_BSvGeRC-njaOGJcYwz4E4_aFsVU0tMYoQ76kkekfBUjrJk5B7UkxNYyrdP8kj4yOx7OAo1WZ-uKE13--SaGEduh1iggH35Hr0)

-   node_modules: npm이 설치한 노드 패키지들이 저장되는 폴더  
-   public: 웹 서비스용 리소스 폴더
-   public/build: src 폴더의 .svelte 파일이나 .js파일이 빌드되어 저장되는 폴더
-   public/favicon.png: 웹사이트 아이콘 파일
-   public/index.html: 메인 HTML 파일
-   src: 우리의 주 관심사인 작업 폴더임 *.svelte 파일과 *.js파일 등 소스 저장 폴더. 빌드 대상이 됨
-   src/App.svelte: 스벨트의 시작점이면서 스벨트 기본 App이 정의된 컴포넌트 파일
-   src/main.js: 웹 애플리케이션의 최초 진입점
-   package-lock: npm dependency tree가 표시된 파일
-   package.json:npm packages 설치 컨트롤 파일
-   rollup.config.js: 롤업 구성에 대해 기술되어 있는 설정 프로그램.
    

스벨트는 기본 프로젝트가 롤업(rollup.js)로 구성되어있다. 이는 자바스크립트 모듈 번들러이다. 번들러는 웹 애플리케이션에 필요한 요소(패키지, 라이브러리, HTML,CSS,JS, 이미지파일)를 하나로 묶어주는 도구

번들러에는 rollup, brouserify, parcel, webpack등이 있고 스벨트는 rollup.js를 사용한다.

  

## 상태관리: 스토어 설정

스벨트에는 내장되어있는 스토어 기능이 있다. 해당 스토어를 이용하여 상태관리를 하도록 한다.
```
import { writable } from  'svelte/store'
export  const  email = writable('');
```
문구를 작성하고, 스토어에서 상태관리를할 각 변수 및 초기값을 정한다.

### 불러오기
스토어에서 값을 불러오는 것을 subscribe라고 한다.
```
import {email} from  '../lib/store.js';
let  savedEmail = ''
email.subscribe((e)=>{
savedEmail = e
});
```

상태 값을 변경 할 때는 set을 이용한다. update도 있지만, set은 새로운 값을 덮어 씌우는 것이고, update는 기존값을 불러와서 변경하는 것이기 때문에 set이 성능상으로 더 좋으므로, set을 사용한다.
```
email.set('123@example.com')
```
  
# 스크린샷

## 진입 페이지 +page.svelte
![](https://lh6.googleusercontent.com/GQVmH9wCESIWvqjnFpofOqdKr76vbzqq8IypMT_jHXZbOXXvWGk8pL1sxiBauDML0Q66RsbDb66MM7DqONdFkEojigRDgJlcZIfdIGHmaJPvHl6fZi2wgiyr8qC8SEaOyQmuVkgjnuHFg8N_Zm_yqNU)


설명:
-   정보/데이터를 조회하고, 해당 계정에 정보가 없으면, 정보 페이지로 넘어간다.
    

## 데이터 입력 페이지 src/routes/datainput/+page.svelte

![](https://lh4.googleusercontent.com/hnGpRtk0RIP4tsAA3309FxIxpXyrMdSPjUtjqvXXapwqW-6j5SS0iZLxsqEOpgCaq3xfd6kso-fvicWnryNbl08ojrqVLohSlrrew-Ls720bNLnNeLra6sF8FsULRABXw9mxTlqgKeGvgKw1Ak9XEJ0)

1.  등록/수정할 정보를 입력한다. ex) 여권정보
	- 해당 프로젝트에서는 MongoDB의 testDB 및 user_db컬렉션안에 있는 데이터로 테스트를 하였다.
2. 입력된 값의 따라, 컬러/문구로 상태를 시각적으로 나타내준다.
	- 초록색: 성공적으로 데이터 등록/수정
	- 빨간색: 각 에러 사항을 표시.
	-  메인페이지로 이동하는 링크

## 칼라별 의미
### 녹색
- 로그인 된 이메일이 유효할 때

> 입력한 유저는 DB에 있고, 찾고자 하는 데이터도 DB에 있음을 나타냅니다. 해당 프로젝트에서는 찾고자 하는 데이터를 phone_number로 지정하였습니다.

![](https://lh4.googleusercontent.com/z9_T9oRtm0Jdxgmo9xfO2HDfMuu8kC_gJowo0UhdG2dLLPiXXkn8xgRxpLkJerX7ByUvRUZ401A_BYAB1TJXEGZevU0d4lVkKabqIkuxpq1psaL51RVJthOt7C-spr0LwPOl_8pajA7-Ci5HK7dXiIU)


- 데이터 입력 성공했을 때
> 데이터를 입력하여 DB에 성공적으로 저장했을 때 나타납니다.

> 새로 입력한 데이터가 무엇인지 하단 문구에 표시됩니다.

![](https://lh3.googleusercontent.com/QeRD43T_zdBahq4fq-QYPI0-W-S3Rqf6fEcutrBpgMotXguFLcoH-bEw9MNnDSznQoeeyy-6UlvNVKbnqG-0GYp79XKNpTLNg0Z0LweEerYyHyT6RLFhTWG8zlNCD6mbeFPNM2a0rdue5c0Jblq_XaQ)

- 데이터를 삭제할 때

> DB에 저장되어있는 데이터를 성공적으로 삭제했을 때 나타납니다.

> 하단 문구에는 데이터가 성공적으로 지워졌다고 표시됩니다.

> 데이터는 존재하지 않으므로, 삭제 버튼은 없어집니다.

![](https://lh6.googleusercontent.com/LjbGKBr1haa6k2ImsDdcnwO54fHvyAK_vRPlqdVboXAHPc8pu7pQlKfXX0H4AqzlDY0ciqJ3AlM_YRBR6IpjO99rkqcFt0QWaXlke8ec9_X76ugz4sYONh-V0xsOU-lRBtdFFBdIRDwoTqJ1KkkU-Jg)

<br/>
  
### 주황색
- 유저는 DB에 있으나, 찾고자 하는 데이터가 없음을 표시합니다. 이때, 데이터를 입력할 창으로 넘어가는 링크가 나타납니다.

> -원 안에는 No data로 표시되며, 밑 문구에는 'No data'라는 문구가 표시됩니다.


![](https://lh5.googleusercontent.com/iFv2erGVu3w32-RPMRERty-O_xlsHAAjoPDUW4PMrLpTDfw7H4Y0I5FHSlhlVu14nlROR14bgkKbgmhDQbS2xSGrUDnNfq5TS8s8vaAy3FmJUf0nxDnQD22KXouqQ7r2rxjansDVJ3-G0aqrQRHipBE)

### 빨간색
하단에 에러 문구 및, 원 안에 에러 사항 표시

> - 없는 유저데이터: 원안에 404를 표시하고, 밑 문구에는 유효하지 않은 이메일이라는 표시를 합니다.

![](https://lh6.googleusercontent.com/oUkfgSsaelfpUqp_W4Vlwoz00EHh8YR40ay6Ctq8txs15rpz8z0hvVA0apzvfzNaLySL7wlyV2OLq974hBZNmG8AVerHXU89Imfaie5TGlc90nNNrcjwW_ffjKbliUTcAIp6x9LPO3Rijq_OE2D5mTk)

> - 아무 입력 없이 버튼을 눌렀을 때: 원 안에 'email is required'표시를 하고, 밑 문구에도 같은 표시를 합니다.

![](https://lh5.googleusercontent.com/XFg_j5taPReA2DCNhtHwKkGshxfiMx7BNip8-RzCU2Tbv1vnKBW1dA7DaK1Nu8-ucmQaWTf7oO7-3pHmz-FSmLz9ODC9YtADmqtoO_MSVUS6wOD481tY8a25cZ30Q8gM2FB-LL8PGF6N_iQnc-ZAcpM)

> - 입력 에러: 정보 입력 창에서 입력을 하지 않았을 때 나타나는 에러입니다.

![](https://lh4.googleusercontent.com/ZFvsmQOLpOb0Ln__rSJma_yfHbOcVqYS9hlMBiSSie99aXpfl6XUYi50uACZrPuoVa8pxs21HUcgEufH8xTmbz2DFfJjgwVCA75Q-sIn_qLsOfTOaOpXDmZDHjxarNsVu6iUFVo-8hBtFOy7vTp3TJ8)

> - 통신 에러: 원안에 connect error표시가 되고, 밑 문구에는 어떤 에러인지 표시를 합니다

![](https://lh3.googleusercontent.com/bwBPpQJnR2_hdjFM0f0SORMYsIZkAfHIVJHdECG43diw6WCe1v6hQJ3a1Qiui_Zwx3UwQf781GOWbRYIO5wNM3207LThDLc1Txcs2MaO9Kjv2fRQEYbQq3JngF4-SsaY8DmdANJ09QMy7iD7YkeoQE0)

