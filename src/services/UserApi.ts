import { useCallback, useState } from 'react';
import { AnswerData, AnswerFormData } from '../models/AnswerModels';
import { AuthUser, UserDataModel } from '../models/UserModels';
import { combineAnswerData, getUserAnswers } from './AnswerApi';
import { getData, getNewId, updateData } from './DBInterface';

export const useCustomUser = () => {
  const [userData, setUserData] = useState<UserDataModel | null>(null);

  const fetchAndSyncUserData = useCallback(
    async (uid: string) => {
      const userData = await getUserData(uid);
      setUserData({ ...userData });
    },

    []
  );
  const setUserNull = useCallback(() => {
    setUserData(null);
  }, []);

  const registerUserDataAndSync = async (uid: string, userData: UserDataModel) => {
    await updateAllUserDataAndSync(uid, userData);
  };

  const updateProfile = async (newProfileData: object) => {
    if (!userData) {
      throw new Error('updateProfile : user not logged in!');
    }

    await updateAllUserDataAndSync(userData!!.uid, appendProfilePath(newProfileData));
  };

  const submitAnswer = async (formData: AnswerFormData) => {
    if (!userData) {
      throw new Error('submitAnswer, no userData');
    }

    const updates = {};

    const newAid = getNewId('answers');
    const answerData: AnswerData = combineAnswerData(newAid, formData, userData);

    updates['answers/' + newAid] = answerData;
    updates['users/' + userData.uid + '/answers/' + newAid] = true;
    updates['user-answers/' + userData.uid + '/' + newAid] = answerData;
    updates['questions/' + formData.question.qid + '/answers/' + newAid] = true;

    await updateData('', updates);
  };

  const updateAllUserDataAndSync = async (uid: string, userData: object) => {
    // when update user profile data, answer data have to be updated.
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

    await updateData('', updates);
    await fetchAndSyncUserData(uid);
  };

  if (!userData) {
    return {
      user: null,
      fetchAndSyncUserData,
      registerUserDataAndSync,
      setUserNull,
    } as AuthUser;
  }

  return {
    user: {
      ...userData,
      updateProfile,
      submitAnswer,
    },
    fetchAndSyncUserData,
    registerUserDataAndSync,
    setUserNull,
  } as AuthUser;
};

const appendProfilePath = (newData: object) => {
  const profileData = Object.keys(newData).reduce(
    (profileData, key) => ({
      ...profileData,
      [`profile/${key}`]: newData[key],
    }),
    {}
  );
  return profileData;
};

export const getUserData = async (uid: string) => {
  const userData: UserDataModel = await getData(`users/${uid}`);
  return userData;
};
