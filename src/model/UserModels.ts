import { AnswerFormData } from "./AnswerModels";

export type AuthUser = {
  user: CustomUser | null;
  fetchAndSyncUserData: (uid: string) => Promise<void>;
  setUserNull: () => void;
  registerUserDataAndSync: (
    uid: string,
    userData: UserDataModel
  ) => Promise<void>;
};

export type UserDataModel = {
  uid: string;
  admin?: boolean;
  email?: string;
  profile: {
    name?: string;
    intro?: string;
  };
  answers?: {
    [aid: string]: boolean;
  };
};
type UserFunctions = {
  submitAnswer: (formData: AnswerFormData) => Promise<void>;
  updateProfile: (newProfileData: object) => Promise<void>;
};

export type CustomUser = UserDataModel & UserFunctions;
