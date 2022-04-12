import {
  AdminAnswers,
  AdminDashboard,
  AdminQuestions,
  AdminUsers,
  BoardPage,
  HomePage,
  LoginPage,
  OnboardingPage,
  QuestionPage,
  RegisterPage,
  SubmitDonePage,
  UserEditPage,
  UserPage,
} from "../pages";
import DailyAnswers from "../pages/Answers/DailyAnswers";
import MonthlyAnswers from "../pages/Answers/MonthlyAnswers";
import WeeklyAnswers from "../pages/Answers/Weekly/WeeklyAnswers";

interface CustomRoute {
  type: RouteType;
  path: string;
  Component: React.FC;
  lazy?: boolean;
}

const componentConfig: { type: RouteType } = {
  type: "component",
};

const nestedRoutesConfig: { type: RouteType } = {
  type: "nestedRoutes",
};

interface PublicRoute extends CustomRoute {
  path: PublicPath;
}

export const publicRoutes: PublicRoute[] = [
  { path: "/onboarding", Component: OnboardingPage, ...componentConfig },
  { path: "/login", Component: LoginPage, ...componentConfig },
  { path: "/register", Component: RegisterPage, ...componentConfig },
];

interface PrivateRoute extends CustomRoute {
  path: PrivatePath;
}

export const privateRoutes: PrivateRoute[] = [
  {
    path: "/submit-done",
    Component: SubmitDonePage,
    ...componentConfig,
  },
  { path: "/board", Component: BoardPage, ...componentConfig },
  { path: "/user", Component: UserPage, ...nestedRoutesConfig },
  { path: "/user/edit", Component: UserEditPage, ...nestedRoutesConfig },
  { path: "/answers", Component: WeeklyAnswers, ...nestedRoutesConfig },
  { path: "/answers/weekly", Component: WeeklyAnswers, ...nestedRoutesConfig },
  { path: "/answers/daily", Component: DailyAnswers, ...nestedRoutesConfig },
  {
    path: "/answers/monthly",
    Component: MonthlyAnswers,
    ...nestedRoutesConfig,
  },
  {
    path: "/question/:qid",
    Component: QuestionPage,
    ...componentConfig,
  },
  { path: "/", Component: HomePage, ...componentConfig },
];

interface AdminRoute extends CustomRoute {
  path: AdminPath;
}

export const adminRoutes: AdminRoute[] = [
  { path: "/questions", Component: AdminQuestions, ...componentConfig },
  { path: "/answers", Component: AdminAnswers, ...componentConfig },
  { path: "/users", Component: AdminUsers, ...componentConfig },
  { path: "/", Component: AdminDashboard, ...componentConfig },
];

export type PublicPath = "/onboarding" | "/login" | "/register";
export type PrivatePath =
  | "/"
  | "/submit-done"
  | "/board"
  | "/user"
  | "/user/edit"
  | "/answers"
  | "/answers/weekly"
  | "/answers/daily"
  | "/answers/monthly"
  | "/question/:qid";
export type AdminPath = "/" | "/questions" | "/answers" | "/users";

type RouteType = "nestedRoutes" | "component";
