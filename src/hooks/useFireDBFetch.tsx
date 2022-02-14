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
  console.log("useFireDBFetch");

  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  const fetchData = useCallback(async () => {
    console.log("fetchData");

    let dbRef = query(ref(fireDB, path));

    if (filter) {
      dbRef = query(
        ref(fireDB, path),
        orderByChild(filter.by),
        equalTo(filter.value)
      );
    }

    setLoading(true);
    const snapshot = await get(dbRef);
    const data = snapshot.val();
    setData(data || {});
  }, [path, filter]);

  const refresh = () => fetchData();

  useEffect(() => {
    try {
      fetchData();
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  return { data, loading, error, refresh };
}
