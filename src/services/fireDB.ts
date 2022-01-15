import { firebaseApp } from "./firebase";
import { ref, child, push, getDatabase, update } from "@firebase/database";
import { convertDate } from "./DateManager";

export const submitAnswer = async (
  uid: string,
  qid: string,
  formData: { answer: string; aid?: string }
) => {
  const db = getDatabase(firebaseApp);
  const aid = formData.aid || push(child(ref(db), "answers")).key;

  // TODO: validation check
  if (!uid) {
    alert("로그인 후 이용해주세요.");
    return;
  }

  const updates = {};

  const answerFormData = {
    qid,
    aid,
    uid,
    answer: formData.answer,
    created_at: convertDate(new Date()),
  };
  updates["/answers/" + aid] = answerFormData;
  updates["/users/" + uid + "/answers/" + aid] = true;
  updates["/questions/" + qid + "/answers/" + aid] = true;

  try {
    await update(ref(db), updates);
  } catch (e) {
    console.error(e);
  }
};
