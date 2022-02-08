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
    - [ ] 유저 이름 변경(현재 익명으로 통일)
  - 현재 AuthContext에 모든 user 정보

# Todo

기능 구현

- [ ] 페이지별 Fetched data caching

Essential UI

- Board(게시판)

  - [ ] answer - private / public 설정
  - [ ] keep button(realtime)
    - 현재 클릭 후 하트 색상 바로 변경 안 됨.

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
