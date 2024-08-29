import { useEffect, useMemo, useState } from "react";
import { ResponseType } from "../types";

export function useFetchData(url: string) {
  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [url]);

  const memoizedData = useMemo(() => data, [data]);

  return { data: memoizedData, error, loading };
}
