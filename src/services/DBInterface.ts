import {
  getDatabase,
  get,
  ref,
  update,
  query,
  orderByChild,
  equalTo,
  child,
  push,
} from "firebase/database";
import { firebaseApp } from "./firebase";

const db = getDatabase(firebaseApp);

export async function getData<T>(
  path: string,
  queries?: { key: string; value: string | number | boolean }
) {
  let getQuery;
  if (queries) {
    getQuery = query(
      ref(db, path),
      orderByChild(queries.key),
      equalTo(queries.value)
    );
  } else {
    getQuery = ref(db, path);
  }

  try {
    const data: T = (await get(getQuery)).val() ?? {};
    return data;
  } catch (e: any) {
    console.log(new Error(e));

    throw new Error();
  }
}

export async function updateData(path: string, data: object | null) {
  let updates;
  if (data) {
    updates = Object.keys(data).reduce(
      (updates, key) => ({ ...updates, [`${path}/${key}`]: data[key] }),
      {}
    );
  } else {
    if (
      path === "answers" ||
      path === "questions" ||
      path === "users" ||
      path === "user-answers"
    ) {
      throw new Error("삭제할 수 없는 범위");
    }
    updates = { [path]: data };
  }
  await update(ref(db), updates);
}

export function getNewId(path: string) {
  const newId = push(child(ref(db), path)).key;
  if (!newId) {
    throw new Error(`getNedId(${path}) - fail to generate new ID`);
  }

  return newId;
}
