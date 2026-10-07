import { useEffect, useState } from "react";

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function useFetch<T>(url: string):FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!url);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    fetch(url, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError(error);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}
