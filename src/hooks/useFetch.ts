import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 에러가 발생하는 상황이 2가지
        const response = await fetch(url);
        // 2. 네트워크 응답은 했으나 404 에러 500 에러일 때
        if (!response.ok) {
          throw new Error("네트워크 응답에 문제가 있습니다.");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        // 1. 네트워크 자체가 문제일 때 ex) 와이파이 끊김, 서버 꺼짐, ...
        setError(
          error instanceof Error ? error.message : "알 수 없는 오류 발생",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
