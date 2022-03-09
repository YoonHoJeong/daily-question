import { fireDB } from "./firebase";
import { get, query, orderByChild, equalTo, ref } from "@firebase/database";

export const fetchFireDBData = async (
  path: string,
  filter: { by: string; value: string | number }
) => {
  const dataRef = query(
    ref(fireDB, path),
    orderByChild(filter.by),
    equalTo(filter.value)
  );

  const data = (await get(dataRef)).val();

  return data;
};
