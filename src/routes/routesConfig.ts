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
  { path: "/onboarding", Component: Onboarding },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
];

export const privateRoutes: PrivateRoute[] = [
  { path: "/submit-done", Component: SubmitDone },
  { path: "/board", Component: Board },
  { path: "/user/edit", Component: UserEdit },
  { path: "/user", Component: User },
  { path: "/answers", Component: Answers },
  { path: "/question/:qid", Component: Question },
  { path: "/", Component: Home },
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
