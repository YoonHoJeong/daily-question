# 묻는 다이어리, 묻다 (Daily Question)

- '묻다'는 자기 이해를 필요로 하는 사람들에게 조력자가 되고자 시작한 서비스 입니다.
- 자기 이해를 위한 첫 걸음은 '의문'이라고 생각했습니다. 아직 의문이 익숙치 않은 사람들을 위해, 매일 3개의 질문을 선정해 전달합니다.

# Project Status

**22.01.01 ~ 현재**

[묻다 서비스 링크](https://daily-question.netlify.app/)

- 디자인 수정 : UI/UX 디자이너와 서비스 리디자인 작업 (진행중)
- 리팩토링 : 프로토타입에 사용되었던 코드 정리 (진행중)
- 사용 가능한 기능
  - 회원가입, 로그인, 로그아웃 등의 유저 인증 관련 기능
  - 지난 질문과 답변 확인

**21.12.31**

- 리팩토링을 위해 서비스 중단.

**21.11.01 ~ 21.12.31**

- 약 2달간 서비스를 운영해 총 200명의 사용자 유치.

# Project Screen Shots

![오늘의 질문, 답변하기, 돌아보기](https://user-images.githubusercontent.com/22267559/155836476-eeae2ef1-d27e-4a34-aa04-d7b644844b35.png)

![돌아보기, 마음함](https://user-images.githubusercontent.com/22267559/155836474-dd08ccb4-eef5-4fbb-9205-ce1ead6d7afc.png)

# Reflection

프로젝트를 진행하면서 고려했던 점들을 정리합니다.

## State Management

- useState  
  초기에 특정 컴포넌트 내에서만 사용되는 state는 전부 useState를 사용.
  - fetched data & loading, error state  
    이후 **server state caching을 위해 react-query로 대체.**
  - form data
- React-Query(RQ)

  - 서버에서 불러와 사용하는 데이터는 react-query를 사용.
  - [SWR와 RQ를 비교](https://quartz-colony-7d8.notion.site/React-Query-vs-SWR-Comparison-8b2699aaec8545498354046e9ec3a018)해보고 필요한 기능이 더 많은 RQ를 선택.

- context API  
  전역적으로 사용되지만 변경되는 빈도가 높지 않은 state는 context API를 사용했다.

  - user authentication  
    유저 인증 상태

  - theme palette  
    dark mode / light mode(default) 기능을 추가하기 위해 styled-components에서 지원하는 ThemeProvider 사용. (현재는 light mode만 구현)

  - sizes  
    텍스트 위주로 구성된 서비스인 만큼 폰트 크기가 사용자 선호도에 따라 변경될 수 있다고 판단했다. 폰트 크기 변경에 따라 margin, padding 등 크기 요소가 변경될 여지가 있어 sizes도 context API로 관리했다.

---

## firebase realtime DB

- Front-End 작업에 집중하기 위해 firebase의 realtime DB를 사용
- users / answers / questions 3개의 tables로 이루어진 관계형을 사용

### get() & client offline error

- firebase DB에서 서버와 실시간 동기화되지 않아도 되는 데이터는 get 함수로 받아왔다. 서버와 연결이 되어있음에도, 해당 함수만 client offline error가 발생하는 에러가 발생했다.
- [몇 년전, 해당 에러를 고치고 있다는 답변](https://stackoverflow.com/questions/46602889/firebase-cloud-firestore-throws-client-is-offline)을 확인했지만, 최근까지도 같은 에러가 발생하고 있다.

해결

- 해당 에러가 첫 시도에서만 발생하기 때문에, 에러가 발생했을 때, 5번까지 재시도하도록 코드를 작성했다.

### limited query

- 데이터 구조를 여러 테이블들로 이루어진 관계형으로 구축했지만, firebase에서 제공하는 query는 다양한 join을 허용하지 않는다.
- 사용자의 모든 답변들과 질문을 함께 가져오기 위해선 users, answers, questions의 테이블을 결합해서 불러와야 했는데, 쿼리가 제한적이라 필요한 데이터를 테이블마다 일일이 가져와서 client-side에서 결합해야했다.
