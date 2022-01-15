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
  queryConstraints?: { [key: string]: string }
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

        const snapshot = await get(ref(db, path));
        const fetched = snapshot.val();

        setData(fetched);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [path]);

  return { data, loading, error };
}
