# :mag: 찾아줄게!

- 서울시 대중교통 분실물 습득물 정보를 통한 분실물건 찾기 & 찾아주기 서비스

## :books: 프로젝트 구성

### 1. 프로젝트 기간

- 2023년 3월 6일(월) ~ 2023년 3월 24일(금), 3주

### 2. 프로젝트 목표

##### :one: 프로젝트 아이디어 동기

&emsp;&emsp;_‘내 물건이 어디 갔지?’_

&emsp;&emsp;기분 좋게 외출을 마치고 집으로 돌아왔는데 물건을 잃어버린 사실을 알게 된 적 없으신가요?  
 &emsp;&emsp;나중에 탑승했던 대중교통에 대한 정보를 찾아도 분실품을 찾지 못하는 경우 당황스럽고 막막하죠.  
 &emsp;&emsp;이러한 문제점을 해결하기 위해 분실 / 습득물에 대한 정보를 공유하는 장을 만들어 보기로 했습니다.

##### :two: 해결책

&emsp;&emsp;_분실물에 대한 회수율을 높이기 위한 방안_

&emsp;&emsp; 분실물에 대한 게시글을 올리면 보상을 지급하고 회수가 될 시 리워드를 지급합니다.  
 &emsp;&emsp; 리워드를 지급하면 사람들이 조금이라도 더 분실물을 유심히 보게 될 것이고 회수율을 높일 수 있을 것입니다.  
 &emsp;&emsp; 리워드 지급 혜택은 회원 고객에 한하여 적용됩니다.  
 &emsp;&emsp; 따라서 ＂이왕 가입한 김에 혜택도 누려보자!＂라는 생각과 함께, 자연스레 신규 회원 유입이 증가하고, 사이트가 활성화되어 많은 사람들이 분실물을 찾을 수 있을 것입니다.

##### :three: 데이터 탐색

&emsp;&emsp; [서울시 대중교통 분실물 습득물 정보](http://data.seoul.go.kr/dataList/OA-15490/S/1/datasetView.do) 데이터를 활용한 월별 분실량/회수율, 장소별 분실율/회수율, 분실물 회수율에 대한 데이터 분석을 통해 대중교통을 이용하며 겪는 물건 분실에 대한 현황과 회수율을 서비스 이용자에게 보여줍니다.

### 3. 프로젝트 기술 스택

- :heavy_check_mark: **Front-End** &ensp;
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=flat-square&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/Next.js-660529?style=flat-square&logo=Next.js&logoColor=white%22/%3E">
  <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=flat-square&logo=react%20query&logoColor=white">
  <img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=flat-square&logo=reacthookform&logoColor=white">
  <img src="https://img.shields.io/badge/-emotion-D26AC2?style=flat-square&logo=emotion&logoColor=white">
  <img src="https://img.shields.io/badge/-recharts-22B5BF?style=flat-square&logo=emotion&logoColor=white">

- :heavy_check_mark: **Back-End** &ensp;
  <img src="https://img.shields.io/badge/JavaScript-808000?style=flat-square&logo=JavaScript&logoColor=white%22/%3E/">
  <img src="https://img.shields.io/badge/MySQL-C71585?style=flat-square&logo=MySQL&logoColor=white%22/%3E">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white">
  <img src="https://img.shields.io/badge/Prisma-000080?style=flat-square&logo=Prisma&logoColor=white%22/%3E">
  <img src="https://img.shields.io/badge/JSONWebTokens-ff0000?style=flat-square&logo=JSONWebTokens&logoColor=white%22/%3E">
  <img src="https://img.shields.io/badge/Swagger-82?style=flat-square&logo=Swagger&logoColor=white%22/%3E">
  <img src="https://img.shields.io/badge/Ajv-FFA500?style=flat-square&logo=Ajv&logoColor=white%22/%3E">
- :heavy_check_mark: **Data Analysis** &ensp;
  <img src="https://img.shields.io/badge/Python-14354C?style=flat-square&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/numpy-%23013243.svg?style=flat-square&logo=numpy&logoColor=white">
  <img src="https://img.shields.io/badge/pandas-%23150458.svg?style=flat-square&logo=pandas&logoColor=white">
  <img src="https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=flat-square&logo=Matplotlib&logoColor=black">
  <img src="https://img.shields.io/badge/jupyter-%23FA0F00.svg?style=flat-square&logo=jupyter&logoColor=white">

### 4. 프로젝트 기능 설명

##### :one: 메인페이지

- 그래프 (월별 분실/회수량, 장소별 분실/회수량, 카테고리 분실량, 전체 회수율) 시각화
- 습득한 물건을 등록할 경우, 혹은 주인을 찾아줄 경우 리워드 제공 => 상위 3명 명예의 전당에서 소개
- 새로 등록된 분실물 5개 (시간순)

##### :two: 회원관련

- 개인회원 혹은 기업회원으로 가입하여 물건을 습득해서 등록할 수도, 잃어버린 물건을 찾아달라고 요청할 수 있음
- 로그인/로그아웃
- 회원가입/회원정보수정/회원탈퇴

##### :three: 마이페이지

- 나의 게시글/리워드 확인 가능

##### :four: 분실물센터

- 카테고리별, 습득일별 현재 분실물 정보 제공
- 회원 습득물 등록 가능
- 분실물 회수 시 습득자에게 리워드 제공

##### :five: 찾아주세요

- 잃어버린 물건을 찾아달라고 분실자가 직접 찾아달라고 글 등록 가능
- 댓글

##### 그 외 문서

- :link: [팀페이지](https://www.notion.so/elice/6-9dbd744e014a4644abbebe0fd34fd7f4?pvs=4)
- :link: [API Description](https://www.notion.so/elice/API-Description-9327335486e4408dbd8ad870bf565067?pvs=4)
- :link: [figma](https://www.figma.com/file/EAa8A31VkxpnMyCTzHI2Zo/2%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)

### 5. 프로젝트 파일 구조

    📦frontend
    ┣ 📂public
    ┃ ┣ 📂img
    ┣ 📂src
    ┃ ┣ 📂api
    ┃ ┃ ┣ 📂boards
    ┃ ┃ ┃ ┣ 📜createBoard.ts
    ┃ ┃ ┃ ┣ 📜deleteBoard.ts
    ┃ ┃ ┃ ┣ 📜fetchBoard.ts
    ┃ ┃ ┃ ┣ 📜fetchBoards.ts
    ┃ ┃ ┃ ┗ 📜updateBoard.ts
    ┃ ┃ ┣ 📂graph
    ┃ ┃ ┃ ┗ 📜getGraph.ts
    ┃ ┃ ┣ 📂items
    ┃ ┃ ┃ ┣ 📜createItem.ts
    ┃ ┃ ┃ ┣ 📜deleteItem.ts
    ┃ ┃ ┃ ┣ 📜fetchItem.ts
    ┃ ┃ ┃ ┣ 📜fetchItems.ts
    ┃ ┃ ┃ ┣ 📜fetchNewItem.ts
    ┃ ┃ ┃ ┣ 📜fetchNoticeItem.ts
    ┃ ┃ ┃ ┗ 📜retrieveItem.ts
    ┃ ┃ ┣ 📂mypage
    ┃ ┃ ┃ ┗ 📜patchMyInfo.ts
    ┃ ┃ ┣ 📂rank
    ┃ ┃ ┃ ┗ 📜getRank.ts
    ┃ ┃ ┣ 📂register
    ┃ ┃ ┃ ┗ 📜index.ts
    ┃ ┃ ┣ 📂users
    ┃ ┃ ┃ ┣ 📜fetchCompanyList.ts
    ┃ ┃ ┃ ┣ 📜fetchMe.ts
    ┃ ┃ ┃ ┣ 📜signin.ts
    ┃ ┃ ┃ ┣ 📜signput.ts
    ┃ ┃ ┃ ┣ 📜signup.ts
    ┃ ┃ ┃ ┣ 📜soginupWithCompany.ts
    ┃ ┃ ┃ ┗ 📜withdrawal.ts
    ┃ ┃ ┗ 📜httpClient.js
    ┃ ┣ 📂components
    ┃ ┃ ┣ 📂base
    ┃ ┃ ┃ ┣ 📜CategoryBadge.tsx
    ┃ ┃ ┃ ┣ 📜Checkbox.tsx
    ┃ ┃ ┃ ┣ 📜FixedSizeButton.tsx
    ┃ ┃ ┃ ┣ 📜FloatingBar.tsx
    ┃ ┃ ┃ ┣ 📜GlobalStyles.tsx
    ┃ ┃ ┃ ┣ 📜Header.tsx
    ┃ ┃ ┃ ┣ 📜Input.tsx
    ┃ ┃ ┃ ┣ 📜InputLabel.tsx
    ┃ ┃ ┃ ┣ 📜Layout.tsx
    ┃ ┃ ┃ ┣ 📜Modal.tsx
    ┃ ┃ ┃ ┣ 📜PageTitle.tsx
    ┃ ┃ ┃ ┣ 📜PreSignup.tsx
    ┃ ┃ ┃ ┣ 📜ProfilePhoto.tsx
    ┃ ┃ ┃ ┣ 📜Radio.tsx
    ┃ ┃ ┃ ┣ 📜ResponsiveButton.tsx
    ┃ ┃ ┃ ┣ 📜TitleInMain.tsx
    ┃ ┃ ┃ ┗ 📜ValidationInput.tsx
    ┃ ┃ ┣ 📂chars
    ┃ ┃ ┃ ┣ 📜BarGraph.tsx
    ┃ ┃ ┃ ┣ 📜ChartBox.tsx
    ┃ ┃ ┃ ┣ 📜LineGraph.tsx
    ┃ ┃ ┃ ┣ 📜PieGraph.tsx
    ┃ ┃ ┃ ┗ 📜Skeleton.tsx
    ┃ ┃ ┣ 📂modal
    ┃ ┃ ┃ ┣ 📜Reception.tsx
    ┃ ┃ ┃ ┗ 📜Withdrawal.tsx
    ┃ ┃ ┣ 📂mypage
    ┃ ┃ ┃ ┣ 📜DefaultInfo.tsx
    ┃ ┃ ┃ ┣ 📜ProfilePhotoInput.tsx
    ┃ ┃ ┃ ┗ 📜styled.tsx
    ┃ ┃ ┣ 📂notice
    ┃ ┃ ┃ ┗ 📜Notice.tsx
    ┃ ┃ ┣ 📂post
    ┃ ┃ ┃ ┗ 📜Item.tsx
    ┃ ┃ ┣ 📂rank
    ┃ ┃ ┃ ┣ 📜RankBox.tsx
    ┃ ┃ ┃ ┗ 📜Ranking.tsx
    ┃ ┃ ┣ 📂register
    ┃ ┃ ┃ ┣ 📜Info.tsx
    ┃ ┃ ┃ ┗ 📜styled.tsx
    ┃ ┃ ┣ 📂table
    ┃ ┃ ┃ ┣ 📜CountText.tsx
    ┃ ┃ ┃ ┣ 📜Pagination.tsx
    ┃ ┃ ┃ ┣ 📜styled.tsx
    ┃ ┃ ┃ ┗ 📜Table.tsx
    ┃ ┣ 📂config
    ┃ ┃ ┗ 📜contstants.ts
    ┃ ┣ 📂hooks
    ┃ ┃ ┣ 📜useCompanyList.ts
    ┃ ┃ ┣ 📜useGetBoard.ts
    ┃ ┃ ┣ 📜useGetBoards.ts
    ┃ ┃ ┣ 📜useGetGraph.ts
    ┃ ┃ ┣ 📜useGetItems.ts
    ┃ ┃ ┣ 📜useGetPostDetail.ts
    ┃ ┃ ┣ 📜useGetRank.ts
    ┃ ┃ ┣ 📜useMe.ts
    ┃ ┃ ┣ 📜useNewItems.ts
    ┃ ┃ ┗ 📜useNoticeItem.ts
    ┃ ┣ 📂models
    ┃ ┃ ┣ 📜baseModel.ts
    ┃ ┃ ┣ 📜boardDetailModel.ts
    ┃ ┃ ┣ 📜boardModel.ts
    ┃ ┃ ┣ 📜categoryModel.ts
    ┃ ┃ ┣ 📜companyModel.ts
    ┃ ┃ ┣ 📜errorResponseModel.ts
    ┃ ┃ ┣ 📜graphModel.ts
    ┃ ┃ ┣ 📜imgModel.ts
    ┃ ┃ ┣ 📜itemDetailModel.ts
    ┃ ┃ ┣ 📜itemModel.ts
    ┃ ┃ ┣ 📜newItemsModel.ts
    ┃ ┃ ┣ 📜noticeItemModel.ts
    ┃ ┃ ┣ 📜rankModel.ts
    ┃ ┃ ┣ 📜userModel.ts
    ┃ ┃ ┗ 📜userWithCompanyModel.ts
    ┃ ┣ 📂pages
    ┃ ┃ ┣ 📂auth
    ┃ ┃ ┃ ┣ 📂signup
    ┃ ┃ ┃ ┃ ┣ 📜company.tsx
    ┃ ┃ ┃ ┃ ┣ 📜complete.tsx
    ┃ ┃ ┃ ┃ ┗ 📜personal.tsx
    ┃ ┃ ┃ ┣ 📜pre-signup.tsx
    ┃ ┃ ┃ ┗ 📜signin.tsx
    ┃ ┃ ┣ 📂found
    ┃ ┃ ┃ ┣ 📜[id].tsx
    ┃ ┃ ┃ ┗ 📜index.tsx
    ┃ ┃ ┣ 📂lost
    ┃ ┃ ┃ ┣ 📜[id].tsx
    ┃ ┃ ┃ ┗ 📜index.tsx
    ┃ ┃ ┣ 📂mypage
    ┃ ┃ ┃ ┗ 📜index.tsx
    ┃ ┃ ┣ 📂register
    ┃ ┃ ┃ ┣ 📂found
    ┃ ┃ ┃ ┃ ┣ 📜[id].tsx
    ┃ ┃ ┃ ┃ ┗ 📜index.tsx
    ┃ ┃ ┃ ┣ 📂lost
    ┃ ┃ ┃ ┃ ┣ 📜[id].tsx
    ┃ ┃ ┃ ┃ ┗ 📜index.tsx
    ┃ ┃ ┣ 📜_app.tsx
    ┃ ┃ ┣ 📜_document.tsx
    ┃ ┃ ┗ 📜index.tsx
    ┃ ┣ 📂styles
    ┃ ┃ ┗ 📜colors.ts
    ┃ ┣ 📂utils
    ┃ ┃ ┣ 📂validation
    ┃ ┃ ┃ ┣ 📜validateCompanyName.ts
    ┃ ┃ ┃ ┣ 📜validateComfirmPassword.ts
    ┃ ┃ ┃ ┣ 📜validateDisplayName.ts
    ┃ ┃ ┃ ┣ 📜validateEmail.ts
    ┃ ┃ ┃ ┣ 📜validateName.ts
    ┃ ┃ ┃ ┗ 📜validatePassword.ts
    ┃ ┃ ┣ 📜localStorageToken.ts
    ┃ ┃ ┣ 📜sessionStorageUtils.ts
    ┃ ┃ ┗ 📜setLocalStorageIsIgnIn.ts
    ┣ 📜.eslintrc.json
    ┣ 📜.gitignore
    ┣ 📜next.config.js
    ┣ 📜package.json
    ┣ 📜pm2.config.js
    ┣ 📜README.md
    ┣ 📜tsconfig.json
    ┗ 📜yarn.lock

### 6. 프로젝트 팀원 역할 분담

| 이름   | 담당 업무                        |
| ------ | -------------------------------- |
| 서지영 | 팀장/프론트엔드 개발/데이터 분석 |
| 김범진 | 프론트엔드 개발/데이터 분석      |
| 최승호 | 프론트트엔드 개발/데이터 분석    |
| 곽희웅 | 백엔드 개발/데이터 분석          |
| 김은수 | 백엔드 개발/데이터 분석          |
| 오서원 | 백엔드 개발/데이터 분석          |

### 7. 버전

    - 프로젝트의 버전 기입
