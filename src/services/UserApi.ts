import { CustomUserType } from "../hooks/useAuth";
import { getUserAnswers } from "./AnswerApi";
import { getData, updateData } from "./DBInterface";

export class CustomUser {
  private _uid: string;
  private _admin: boolean;
  private _profile: {
    name?: string;
    email?: string;
    intro?: string;
  };
  constructor(user: CustomUserType) {
    this._uid = user.uid;
    this._admin = user.admin;
    this._profile = user.profile;
  }
  isAdmin() {
    return this._admin;
  }
  public get uid() {
    return this._uid;
  }
  public get name() {
    return this._profile.name;
  }
  public get email() {
    return this._profile.email;
  }
  public get intro() {
    return this._profile.intro;
  }
  public get data() {
    return {
      uid: this._uid,
      admin: this._admin,
      profile: this._profile,
    };
  }
  async update(newData: object) {
    await updateUserData(this._uid, newData);
  }

  async updateProfile(newData: object) {
    const profileData = Object.keys(newData).reduce(
      (profileData, key) => ({
        ...profileData,
        [`profile/${key}`]: newData[key],
      }),
      {}
    );

    await this.update(profileData);
  }

  async submitAnswer() {
    throw new Error("구현 중 기능");
  }
}

export const getUserData = async (uid: string) => {
  const userData: CustomUserType = await getData(`users/${uid}`);
  return userData;
};

export const updateUserData = async (uid: string, userData: object) => {
  // when update user profile data, answer data have to be updated.
  console.log("updateUserData");
  console.log(uid, userData);

  // 'users', 'answers', 'user-answers'
  const userAnswers = await getUserAnswers(uid);
  const updates = Object.keys(userData).reduce((updates, key) => {
    Object.keys(userAnswers).forEach((aid) => {
      updates[`user-answers/${uid}/${aid}/user/${key}`] = userData[key];
      updates[`answers/${aid}/user/${key}`] = userData[key];
    });
    updates[`users/${uid}/${key}`] = userData[key];

    return updates;
  }, {});

  await updateData("", updates);
};
