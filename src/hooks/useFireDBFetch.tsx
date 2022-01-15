import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { useEffect, useState } from "react";

export function useFireDBFetch<T>(
  path: string,
  filter?: { by: string; value: any }
): {
  data: T;
  loading: boolean;
  error: any;
} {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const db = getDatabase();
        let dbRef = query(ref(db, path));

        if (filter) {
          dbRef = query(
            ref(db, path),
            orderByChild(filter.by),
            equalTo(filter.value)
          );
        }

        const snapshot = await get(dbRef);
        const fetched = snapshot.val();
        console.log("fetched");

        setData(fetched);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
}
