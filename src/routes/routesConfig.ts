import {
  AdminAnswers,
  AdminDashboard,
  AdminQuestions,
  AdminUsers,
  AnswersPage,
  BoardPage,
  HomePage,
  LoginPage,
  OnboardingPage,
  QuestionPage,
  RegisterPage,
  SubmitDonePage,
  UserPage,
  UserEditPage,
} from "../pages";

interface CustomRoute {
  path: string;
  Component: React.FC;
  lazy?: boolean;
}

interface PublicRoute extends CustomRoute {
  path: PublicPath;
}

interface PrivateRoute extends CustomRoute {
  path: PrivatePath;
}

interface AdminRoute extends CustomRoute {
  path: AdminPath;
}

export const publicRoutes: PublicRoute[] = [
  { path: "/onboarding", Component: OnboardingPage },
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
];

export const privateRoutes: PrivateRoute[] = [
  { path: "/submit-done", Component: SubmitDonePage },
  { path: "/board", Component: BoardPage },
  { path: "/user/edit", Component: UserEditPage },
  { path: "/user", Component: UserPage },
  { path: "/answers", Component: AnswersPage },
  { path: "/question/:qid", Component: QuestionPage },
  { path: "/", Component: HomePage },
];

export const adminRoutes: AdminRoute[] = [
  { path: "/questions", Component: AdminQuestions },
  { path: "/answers", Component: AdminAnswers },
  { path: "/users", Component: AdminUsers },
  { path: "/", Component: AdminDashboard },
];

export type PublicPath = "/onboarding" | "/login" | "/register";
export type PrivatePath =
  | "/"
  | "/submit-done"
  | "/board"
  | "/user"
  | "/user/edit"
  | "/answers"
  | "/question/:qid";
export type AdminPath = "/" | "/questions" | "/answers" | "/users";
