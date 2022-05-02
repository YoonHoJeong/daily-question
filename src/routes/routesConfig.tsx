import {
  AdminAnswers,
  AdminDashboard,
  AdminLogin,
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
  UserEditPage,
  UserPage,
} from '../pages';

interface CustomRoute {
  type: RouteType;
  path: string;
  Component: React.FC;
  lazy?: boolean;
}

const componentConfig: { type: RouteType } = {
  type: 'component',
};

const nestedRoutesConfig: { type: RouteType } = {
  type: 'nestedRoutes',
};

interface PublicRoute extends CustomRoute {
  path: PublicPath;
}

export const publicRoutes: PublicRoute[] = [
  { path: '/onboarding', Component: OnboardingPage, ...componentConfig },
  { path: '/login', Component: LoginPage, ...componentConfig },
  { path: '/register', Component: RegisterPage, ...componentConfig },
];

interface PrivateRoute extends CustomRoute {
  path: PrivatePath;
}

export const privateRoutes: PrivateRoute[] = [
  {
    path: '/submit-done',
    Component: SubmitDonePage,
    ...componentConfig,
  },
  { path: '/board', Component: BoardPage, ...componentConfig },
  { path: '/user', Component: UserPage, ...nestedRoutesConfig },
  { path: '/user/edit', Component: UserEditPage, ...nestedRoutesConfig },
  { path: '/answers/*', Component: AnswersPage, ...nestedRoutesConfig },
  {
    path: '/question/:qid',
    Component: QuestionPage,
    ...componentConfig,
  },
  { path: '/', Component: HomePage, ...componentConfig },
];

type RouteType = 'nestedRoutes' | 'component';

interface AdminRoute extends CustomRoute {
  path: AdminPath;
}

export const adminRoutes: AdminRoute[] = [
  { path: 'admin', Component: AdminQuestions, ...componentConfig },
  { path: 'admin/login', Component: AdminLogin, ...componentConfig },
];

export type PublicPath = '/onboarding' | '/login' | '/register';
export type PrivatePath =
  | '/'
  | '/submit-done'
  | '/board'
  | '/user'
  | '/user/edit'
  | '/answers/*'
  | '/answers/weekly'
  | '/answers/daily'
  | '/answers/monthly'
  | 'answers'
  | '/question/:qid'
  | 'daily'
  | 'weekly'
  | 'monthly';
export type AdminPath = 'admin' | 'admin/login' | 'admin/questions' | 'admin/answers' | 'admin/users';
