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

- [ ] night mode
- [ ] 내 답변 / 질문 검색하기
- [ ] 답변 엑셀로 내보내기
- [ ] 게시판
  - [ ] 내 질문 & 답변 공개 / 비공개 설정
  - [ ] 하트
- [ ] 하단 네비게이션 - 오늘 질문, 게시판, 내 정보
- [ ] 페이지별 데이터 캐싱

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

  - [ ] 유저 프로필 사진 설정
