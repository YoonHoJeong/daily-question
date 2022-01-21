import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { fireDB } from "../services/firebase";

export function useFireDBFetch<T>(
  path: string,
  filter?: { by: string; value: any }
): {
  data: T;
  loading: boolean;
  error: any;
  refresh: () => Promise<void>;
} {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  const fetchData = useCallback(async () => {
    try {
      let dbRef = query(ref(fireDB, path));

      if (filter) {
        dbRef = query(
          ref(fireDB, path),
          orderByChild(filter.by),
          equalTo(filter.value)
        );
      }

      const snapshot = await get(dbRef);
      const fetched = snapshot.val();
      console.log(fetched);

      setData(fetched);
    } catch (e: any) {
      console.error(e);

      setError(e);
    } finally {
      setLoading(false);
    }
  }, [path, filter]);

  const refresh = () => fetchData();

  useEffect(() => {
    fetchData();
  }, [path, filter, fetchData]);

  return { data, loading, error, refresh };
}
