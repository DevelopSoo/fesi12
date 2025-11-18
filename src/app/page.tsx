"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  // 데이터를 조회하는 방법 -> useQuery
  const { data, isLoading, error } = useQuery<Post[]>({
    // 2가지
    // 1. 쿼리 키
    queryKey: ["posts"],
    // 2. 데이터를 요청하는 함수
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/posts");
      if (!response.ok) {
        throw new Error("서버에서 데이터를 가져오는데 실패했습니다.");
      }
      return response.json();
    },
  });

  const [values, setValues] = useState({
    title: "",
    body: "",
  });

  // 캐싱된 데이터를 관리해주는 객체
  // 추가가 끝나면 기존에 캐싱을 없애고 다시 가져와
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async (newPost: { title: string; body: string }) => {
      const response = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("게시물 작성에 실패했습니다.");
      }
      return response.json();
    },
    onSuccess: () => {
      // 기존에 가져왔던 데이터(캐싱) 지우고, 다시 가져와
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // react query로 데이터 변경 API 요청
    createPostMutation.mutate(values);
    setValues({ title: "", body: "" });
  };

  // isLoading은 데이터를 가져오는 중에 true vs false???
  // data 에는 값이 있을까? 없다
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
          <div>
            <label htmlFor="title">제목</label>
            <input
              id="title"
              className="w-full rounded border border-gray-300 p-2"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="body">본문</label>
            <textarea
              id="body"
              className="w-full rounded border border-gray-300 p-2"
              value={values.body}
              onChange={(e) => setValues({ ...values, body: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            제출
          </button>
        </form>
        <ul>
          {data?.map((item) => (
            <li key={item.id} className="mb-2 border-b border-gray-300 pb-2">
              <h3 className="font-bold">
                {item.id}: {item.title}
              </h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
