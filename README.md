# Daily Question(Refactoring)

# File Structure

1. 컴포넌트를 기능별로 구분

   1. routes
   1. components
   1. hooks
   1. services

1. named export 사용

## src/routes

routing에 사용되는 page templates

1. admin (/yadmin)
1. Login (/login)
1. Menu (/)
1. Keywords (/keywords)
1. Question (/question)
1. Rating (/rating)
1. SubmitDone (/submit-done)
1. Answers (/answers)

## src/components

page template에 들어가는 재사용 가능한 components

1. Input
   - props
     1. type
     1. lines
1. Button
   - props
     1. fullWidth - Boolean
     1. color - "blue" / "green" / "skyblue" / "purple"
     1. variant - "normal"(default) / "outlined" / "contained"
1. Keyword
   - props
     1. value
     1. onClick
1. KeyWordList
   - props
     1. keywords
1. MainHeader
   - props
     1. activeHistoryBack
1. AnswerCard
   - props
     1. question
     1. answer
1. CircularDate
   - props
     1. contained - Boolean
     1. onClick
1. Dates
   - props
     1. children(list of CircularDate)

## src/hooks

components에 사용하는 비즈니스 로직 구성

## src/services

외부 서비스 자원과 통신하는 로직

# Refactoring Log

- 22.01.04

  - [x] file naming, function component convention
  - [x] basic routing
  - [x] make static website

- 22.01.12

  - [x] add login
    - [x] useForm(hook)
    - [x] useAuth(hook)
      - [x] login

- 22.01.13

  - [x] firebase 연결, 질문 가져오기
  - [x] 답변 제출

- 22.01.14

  - [x] user scenario #1 - submit answers

- 22.01.15

  - [x] load user answer
  - [x] my answers page
  - [x] create user-answers db(for my-answers)

- 22.01.17

  - [x] route 변경
    - [x] 3번 째 route ('/answers' -> '/user')
  - [x] user route page done
  - [x] logged in when reload page
  - [x] delete 'PrivateRoutes' component (multiple routing error)

- 22.01.18

  - [x] admin page
    - [x] admin login
    - [x] admin routes setting

- 22.01.19

  - admin
    - [x] 질문 등록 및 관리
    - [ ] 답변 관리
    - [ ] 회원 정보 관리
  - styling
    - [x] home
    - [x] question
    - [x] header

- 22.01.23

  - [x] Answers
    - [x] 일간
    - [x] 주간 화면 format
    - [x] 월간

- 22.01.25

  - [x] data flatting(user-answers)
    - [x] 제출할 때 user-answers에 저장
    - [x] answers에서 user-answers 받아오기
  - [x] weekly answers - data 연결

- 22.01.26

  - [x] 월간 나의 답변
  - [x] 일간 나의 답변
  - [x] 유저 DB 생성(user auth)
  - [x] 유저 등록 + error handling

- 22.01.27

  - [x] add image preload hook
  - [x] debug - fail to fetch answer data in answers page

- 22.02.03

  - admin questions page

    - [x] create
    - [x] read

- 22.02.04

  - board page

    - [x] getBoardAnswers logic 구현

- 22.02.07

  - [x] DayAnswers interface 변경 필요, date - \[keyword\] - Answer
  - [x] Board page - load recently 30 answers

- 22.02.08

  - global variables
    - bottom navigation, header 등, 공통적으로 사용하는 변수명 관리
    - theme과 같이 context API를 통해 app 전역에서 사용할 수 있도록 설정
  - theme - sizes 추가
    - bottom navigation height, header height, global size 설정
  - defaultUserImage 컴포넌트 분리(UserProfile, AnswersByDay, UserEdit에 재사용)
  - board page
    - [x] 하트(담아두기) 기능 구현
  - 현재 AuthContext에 모든 user 정보
  - [x] loader background + z-index: 9999 (loading 중 클릭 불가)
    - 한 페이지에서 fetching 도중(state 변경 중)에 다른 페이지로 이동하는 것 방지

- 22.02.09

  - [x] useAuth -> 반환되는 auth 객체가 null인 경우 처리 (defaultValue 설정)
  - [x] keep button(realtime)

    - 현재 클릭 후 하트 색상 바로 변경 안 됨.

    방안

    1. realtime DB 연결, answers state <-> firebase DB 실시간 동기화

    - 클릭과 색상 변경 사이에 약간의 텀 예상

    2. like 누르자마자 state 변경, DB update가 실패하면 state 다시 변경

    - 빠르게 색상 전환 가능(UX)
    - 실패했을 경우, 에러 핸들링
    - instagram 참고, 누르자마자 아이콘 변경 & /like or /unlike request

  - user keeps 페이지 구현
    - [x] 기본 UI
    - [x] unkeep시 카드 disappear
    - [x] preload images
  - AnswersByDay
    - [x] preload images
    - [x] add keeps state / isFetching
  - [x] user keeps, board page 데이터 동기화

- 22.02.10
  - [x] userEdit page 제작
    - useAuth에 user/name listener 생성
- 22.02.11
  - UserEdit page
    - [x] popup - EditorPopup Component 추상화
      - UserEdit Component에서 무슨 컴포넌트인지 알 수 있도록 show, submitPopup props 추가
    - [x] useAuth - user DB Listener 삭제(onValue)
      - 잦은 변경이 없는 데이터, 수정되는 함수마다 userData Refreshing
    - [x] user DB 구조 변경
      - user profile 데이터만 분리, 1개 이상의 데이터가 포함되어서(name, intro, ...)
      - profile user/:uid/profile
  - [x] add useAuth user profile update 함수
    - CustomUser에 들어가는 데이터가 2개의 fetch를 기다려야 하는 상황
    - 2개의 fetch를 각 함수로 나누고, 그 함수 내에서 setState를 하면, 비동기 처리에 의해 둘 중 하나는 덮어씌워짐.
    - solution) fetch하는 함수만 나누고, setState는 한 군데서 진행.
  - UserProfile
    - [x] make 'move to userEdit' icon optional(add props)
    - [x] make email field optional(add props)
- 22.02.12

  - [x] bottom navigation - 돌아보기(/ansewrs) 탭 추가
  - [x] globalVariables - pathnames 변수 추가

- 22.02.14

  - (admin) question CRUD
    - [x] question Create
    - [x] question Update
    - [x] question Delete

- 22.02.15
  - AnswersByDay Code Refactoring
    - 컴포넌트 합성(Composition)으로 props 전달 최소화
      - keep/unkeep
      - userProfileComponent
      - unKeepDisappear
    - loading state 삭제
      - Board, DailyAnswers, UserKeeps loading state 추가
    - 공통으로 사용되는 keeps 데이터 state 추가
  - [x] userEdit popup 열렸을 때 input focus

# Todo

기능 구현

- [ ] 일별로 답변을 구분할 때, 생성 일자로 구분할 지, publish_date로 구분할 지
- [ ] 페이지별 Fetched data caching
- [ ] Auth - login 여부에 따라 필요로 하는 함수가 달라서, interface 2개 구분해서 사용
- [ ] user board

Essential UI

- Board(게시판)

  - [ ] 유저 이름 변경(현재 익명으로 통일)
  - [ ] answer - private / public 설정

- admin questions page

  - [ ] update
  - [ ] delete

- admin users page
  - [ ] read

For UX(Additional)

- [ ] night mode
- [ ] 내 답변 / 질문 검색
- [ ] 답변 엑셀로 내보내기

코드 가독성 / 관심사 분리

- [ ] interface 구분, 통일시키기
- [ ] services - 기능별 module 구분하기
  - [ ] fireDB.ts
  - [ ] dateService.ts

Backend

- data join logic 만들기(board, daily answers에서 data 형태)
  - 현재는 client-side에서 data join
- fireBase
  - [ ] user-answers data flattening
