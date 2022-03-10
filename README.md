# 묻는 다이어리, 묻다 (Daily Question)

'묻다'는 나를 이해하고 싶은 사람들을 위해 시작한 서비스입니다.

자기 이해를 위한 첫 걸음은 의문이라고 생각합니다. 의문이 익숙치 않은 사람들을 위해, 매일 3개의 질문을 전달합니다.

# Project Status

## 2022.01 ~

['묻다' 서비스 구경하기](https://asking-diary.netlify.app/)

<br/>

> **디자인을 다시 만들고 있어요.**

- 디자이너와 협업해서 디자인을 개선하고 있어요.

<br/>

> **기능을 추가하고 있어요.**

- 둘러보기

  내 답변을 공개하고, 다른 사람의 답변을 확인할 수 있어요.

- 익명으로 답변 공유하기

  내 정보를 공개하는게 부담스러운 분들을 위해 익명 기능도 개발했어요.

- 돌아보기

  내 답변을 일간 / 주간 / 월간 화면으로 보면서 나를 돌아보는 시간을 가질 수 있어요.

<br/>

> **현재 사용할 수 있는 기능**

- 회원가입과 로그인, 사진 등록을 제외한 프로필 편집 기능

- 이미 작성된 답변들로 서비스 UI 둘러보기

<br/>

---

## 2021.11 ~ 2021.12

<br/>

- `2`달간, 약 `200`분의 사용자들에게 `180`개의 질문을 전달했어요.

---

# Project Screen Shots

![오늘의 질문, 답변하기, 돌아보기](https://user-images.githubusercontent.com/22267559/155836476-eeae2ef1-d27e-4a34-aa04-d7b644844b35.png)

![돌아보기, 마음함](https://user-images.githubusercontent.com/22267559/155836474-dd08ccb4-eef5-4fbb-9205-ce1ead6d7afc.png)

# Reflection

## State Management

<br/>

### 1. Global State Management

- Context API

  <u>**가끔**</u> 업데이트되는 global state

  - user authentication (with 'useAuth' hook)
  - global palette data(color, size)

- React Query

  <u>**빈번하게**</u> 업데이트되는 global state

  - server state management
  - [why do i choose React Query?](https://quartz-colony-7d8.notion.site/React-Query-vs-SWR-Comparison-8b2699aaec8545498354046e9ec3a018)
    - caching server state
    - selectors (data transformer function)
    - render optimization
    - Query Cancellation
  - build custom query hooks
    - manage query key in single source

### 2. Local State Management

- custom hooks & useState
  - useForm
    - form data 변화를 반영할 때 사용

<br/>

---

## firebase

<br/>

### 1. RTDB - get( ) & client offline error

firebase database의 'get' 함수를 통해 데이터를 받아올 때, 서버와 연결되어있어도 'client offline error'가 발생할 수 있다.

원인을 찾아보니 1) sdk internal error, 2) poor network status, 3) allow one person at a time 3가지로 분류할 수 있었다.

1.  sdk internal error

    > firebase 9.4 버전 이후로 나타나는 이유를 알 수 없는 오류.

    9.3으로 버전을 낮추면 해결할 수 있다. 본 프로젝트에선 9.1 버전을 사용했으므로, 해당 원인이 될 수 없었다.

1.  poor network status

    > 네트워크 연결이 미흡해서 실제로 서버와 연결이 끊겼을 때 발생하는 오류.

    2개 이상 네트워크 환경에서 테스트해봤을 때도 같은 문제점이 발생했고, firebase의 authentication 기능은 정상적으로 동작하는 것을 보아 network 문제는 아니었다.

1.  allow one person at a time

    > 데이터베이스에 접근하는 사용자 수가 제한되어 있어 발생하는 오류.

    가장 가능성이 높은 오류. 개발 당시 여러 브라우저로 데이터베이스에 동시에 접근한 적이 높은데, 이럴 때 해당 오류가 발생했다.

### 2. limited query

firebase database는 다양한 쿼리를 제공하지 않는다.

- 2개 이상의 테이블에 대해 join을 수행해야하는 경우가 많았는데, firebase에서 제공하는 쿼리로는 해당 작업을 수행할 수 없었다. 해결 방법으로는,

  1. foreign key를 통해 다른 테이블 데이터 fetch.
  1. 두 개의 테이블을 join한 테이블 사용

     ex, 사용자가 답변한 데이터를 저장하는 user-answers table 생성, 데이터 관리.

1번 방법은 foreign key를 갖는 데이터를 먼저 fetch하고, 해당 foreign key로 다음 데이터를 fetch해야한다. 같은 양의 데이터라도 병렬적으로 처리되지 않아서 더 오랜 시간이 걸린다. 만약, 3개 이상의 테이블을 순차적으로 조회해야 하는 경우 처리하는 시간이 기하급수적으로 시간이 늘어난다.

2번 방법은 중복되는 데이터가 늘어나고, 동기화가 어렵다. 데이터를 불러오는 경우엔 더 빠른 처리가 가능하지만, 업데이트에 시간이 조금 더 걸린다.
그리고, 업데이트하는 함수를 변경하는 경우, 관련된 테이블의 path를 모두 업데이트해야하므로, 오류가 발생할 확률이 높다.
