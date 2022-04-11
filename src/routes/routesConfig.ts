import {
  AdminAnswers,
  AdminDashboard,
  AdminQuestions,
  AdminUsers,
  Answers,
  Board,
  Home,
  Login,
  Onboarding,
  Question,
  Register,
  SubmitDone,
  User,
  UserEdit,
} from "../pages";

interface CustomRoute {
  path: string;
  Component: React.FC;
  lazy?: boolean;
}

export const publicRoutes: CustomRoute[] = [
  { path: "/onboarding", Component: Onboarding },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
];

export const privateRoutes: CustomRoute[] = [
  { path: "/submit-done", Component: SubmitDone },
  { path: "/board", Component: Board },
  { path: "/user/edit", Component: UserEdit },
  { path: "/user", Component: User },
  { path: "/answers", Component: Answers },
  { path: "/question/:qid", Component: Question },
  { path: "/", Component: Home },
];

export const adminRoutes: CustomRoute[] = [
  { path: "/questions", Component: AdminQuestions },
  { path: "/answers", Component: AdminAnswers },
  { path: "/users", Component: AdminUsers },
  { path: "/", Component: AdminDashboard },
];
