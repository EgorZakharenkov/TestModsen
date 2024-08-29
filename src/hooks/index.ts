import { useEffect, useState } from "react";

type FetchState = {
  data: [] | null;
  loading: boolean;
  error: string | null;
};

export function useFetch(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState>({
    data: null,
    loading: true,
    error: null,
  });
  const fetchData = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error: unknown) {
      setState({
        data: null,
        loading: false,
        error: (error instanceof Error && error.message) || "Unknown error",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { ...state };
}
