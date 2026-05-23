export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  FeedTab: undefined;
  ExplorarTab: undefined;
  DesafiosTab: undefined;
  CursosTab: undefined;
  PerfilTab: undefined;
};

export type FeedStackParamList = {
  Feed: undefined;
  PostDetail: { postId: string };
  UserProfile: { userId: string };
};

export type ExplorarStackParamList = {
  Explorar: undefined;
  ChallengeDetail: { challengeId: string };
};

export type DesafiosStackParamList = {
  Desafios: undefined;
  Checkin: { challengeId: string };
  ChallengeProgress: { challengeId: string };
  CreateChallenge: undefined;
  ChallengeHistory: { challengeId: string };
};

export type CursosStackParamList = {
  Cursos: undefined;
  CourseDetail: { courseId: string };
  Lesson: { lessonId: string; courseId: string };
};

export type PerfilStackParamList = {
  Perfil: undefined;
  EditProfile: undefined;
  Badges: undefined;
  Settings: undefined;
  FAQ: undefined;
  Support: undefined;
  About: undefined;
};
