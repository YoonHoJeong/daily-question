# Daily Question(Refactoring)

# File Structure

1. 컴포넌트를 기능별로 구분

   1. routes
   1. components
   1. hooks
   1. services

## src/routes

routing에 사용되는 page templates

1. admin (/years_teams)
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
