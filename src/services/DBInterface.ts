import {
  getDatabase,
  get,
  ref,
  update,
  query,
  orderByChild,
  equalTo,
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

  const data: T = (await get(getQuery)).val() ?? {};

  return data;
}

export async function updateData(path: string, data: object) {
  const updates = Object.keys(data).reduce(
    (updates, key) => ({ ...updates, [`${path}/${key}`]: data[key] }),
    {}
  );
  await update(ref(db), updates);
}
