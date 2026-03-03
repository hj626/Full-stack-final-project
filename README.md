# 🚜 농사팜 (농사Farm)
## 마이페이지, UI/UX, DB관리, 사용자 포지셔닝 및 기능 아이데이션 담당


> **데이터 기반 농산물 시세 분석 및 직거래 플랫폼** <br>
> 농사팜은 지역 및 도매 시장별 농산물 가격 데이터를 분석하여 투명한 시세 정보를 제공하고, <br>
>이를 기반으로 생산자와 소비자를 연결하는 농산물 직거래 플랫폼입니다.
<br>

---

## 📝 프로젝트 소개

### **"데이터 기반 농산물 시세 정보 분석 및 직거래 시스템"**

농사팜은 지역 및 도매 시장별 농산물 가격 정보를 분석하여 사용자에게 제공하고, <br>
이를 기반으로 농산물 직거래를 활성화하는 플랫폼입니다. <br>
소비자가 손쉽게 그날 시세를 확일할수 있으며, 생산자와 소비자를 직접 연결하여 합리적인 거래 환경을 조성합니다.

---

## ✨제작 배경
- 당일 농수산물의 시세를 확인하기 어려움.
- 도매시장을 방문해야만이 저렴하게 구매가 가능함.
- 소비자들에게 있어서 도매 시장 및 상인 정보가 부족함.
- 시세, 시장 및 상인 정보를 쉽게 확인하고 구매까지 가능한 프로그램을 개발하고자 함.

---

## 🛠 기술 스택

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1772445693032?alt=media&token=13fab2e2-aab5-4ae5-abd3-eb0a98b0c40a)](https://github.com/msdio/stackticon)

- Backend : Spring Boot (Java), Spring Security, JWT
- Frontend : React, JavaScript, HTML5, CSS3, Bootstrap, Chart.js
- Database & AI : MongoDB, OpenAI API, Google Gemini, Kakao api
---

```
농사 Farm
├── 📄 package.json          # 루트 프로젝트 설정 
│
├── 📂 backend/              # Spring Boot 애플리케이션
│   ├── 📄 build.gradle      # Gradle 빌드 설정
│   └── 📂 src/main/java/com/farm/backend/
│       ├── 📄 BackendApplication.java # 메인 실행 파일
│       ├── 📂 controller/   # API 엔드포인트
│       ├── 📂 domain/       # 도메인 모델 (JPA Entity 등)
│       ├── 📂 dto/          # 데이터 전송 객체
│       ├── 📂 repository/   # DB 접근 계층
│       └── 📂 service/      # 비즈니스 로직
│
└── 📂 frontend/             # React 애플리케이션
    ├── 📄 package.json      # React 의존성 설정
    └── 📂 src/
        ├── 📄 App.js        # 메인 컴포넌트
        ├── 📂 api/          # 백엔드 API 통신 설정
        ├── 📂 components/   # 재사용 컴포넌트
        ├── 📂 pages/        # 페이지 컴포넌트
        └── 📂 styles/       # CSS/SCSS 스타일
```


---

## ✨ 주요 기능

### 1. 농산물 시세 정보 분석 📊
**실시간 시세 조회**: 도매 시장별 실시간 가격 정보를 그래프로 시각화하여 제공합니다
**가격 추이 비교**: 과거 데이터와 현재 가격을 비교하여 증감 추이를 분석합니다
**AI 가격 예측**: 축적된 데이터를 기반으로 향후 가격을 예측하여 가격정보를 제공니다

### 2. 농산물 직거래 시스템 🛒
**직거래 마켓**: 산지 직거래 시장 정보를 통해 상품정보, 위치, 판매수량 등을 확인하고 구매할 수 있습니다
**결제 및 배송**: Toss Payments를 연동하여 안전한 결제를 지원하며, QR 코드를 통한 배송 상태 로직을 처리합니다

### 3. 사용자 커뮤니티 💬
**정보 공유**: 이용자 간 경험 공유나 질문이 가능한 커뮤니티 기능을 제공합니다
**신뢰성 있는 리뷰**: 구매자가 작성한 실제 리뷰를 통해 직거래의 신뢰도를 높입니다

---

## 🔄 User Flow

1. 회원가입 / 로그인 / 판매자 등록
2. 농산물 시세 조회 및 비교 
3. 시장 목록 및 상품 정보 검색 
4. 상품 찜하기 / 장바구니 담기 
5. 가상 결제 API를 통한 구매 
6. 배송 상태 확인 및 리뷰 작성 
7. 커뮤니티 활동 및 AI 챗봇 이용


---



## 🖥 실행 화면

### 🖥️화면 구성

https://github.com/user-attachments/assets/c24b0445-6a34-45c4-8773-c4c82eeab7a4

<br>

### 👤 일반회원 로그인 및 기능

https://github.com/user-attachments/assets/0c38e388-9ed5-473f-85a4-365a03a8384e

<br>

### 📦 판매자 로그인 및 기능

https://github.com/user-attachments/assets/f2a7f466-951e-441b-9ce0-5279e0c7772c

<br>

### ✍ 어드민 로그인 및 기능


https://github.com/user-attachments/assets/ec20d91e-04a3-4606-bb65-b491eba0562f

<br>

### 🧐 상담기능

https://github.com/user-attachments/assets/a9942448-fe5a-46b0-ae1b-c089b07bc9b5


<br>

---


## 🌱 프로젝트 회고

- Git 협업 규칙 부재로 인한 충돌 경험 → PR 기반 협업의 중요성 인식
- 사용자의 UI/UX 편의성을 고려한 레이아웃 연구 필요.
- 유사 사이트 추가 탐색 후 기능 추가 필요.

---

## 🔮 향후 계획

- 보안 test 후 추가 개발.
- 유사 사이트 연구 후 베리에이션.
- ui/Ux 및 세련된 디자인 개선 및 추가 매출발생 창구 기능 추가 개발.




---

👥 Team 5조

<table>
<tr>
<td align="center" width="180">
<img src="https://github.com/waguwagu796.png?size=120" width="120" height="120" alt="김재혁" />
</a><br/>
<b> PL/ 김재혁</b><br/>
<sub>Full-stack</sub>
</td>



<td align="center" width="180">
<a href="https://github.com/hj626">
<img src="https://github.com/hj626.png?size=120" width="120" height="120" alt="강혜정" />
</a><br/>
<b> 강혜정</b><br/>
<sub>Full-stack</sub><br/>
<a href="https://github.com/hj626">@hj626</a>
</td>



<td align="center" width="180">
<img src="https://github.com/Trud-Hong.png?size=120" width="120" height="120" alt="홍원식" />
</a><br/>
<b>홍원식</b><br/>
<sub>Full-stack</sub><br/>
</td>

<td align="center" width="180">
<img src="https://github.com/insu1918.png?size=120" width="120" height="120" alt="황인수" />
</a><br/>
<b>황인수</b><br/>
<sub>Full-stack</sub><br/>
</td>


<td align="center" width="180">
<img src="https://github.com/JIWoen-code.png?size=120" width="120" height="120" alt="박지원" />
</a><br/>
<b>박지원</b><br/>
<sub>Full-stack</sub><br/>
</td>

<td align="center" width="180">
<img src="https://github.com/khr113201-eng.png?size=120" width="120" height="120" alt="김명갑" />
</a><br/>
<b>김명갑</b><br/>
<sub>Full-stack</sub><br/>
</td>









</tr>
</table>

