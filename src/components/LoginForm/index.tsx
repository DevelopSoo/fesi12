// src/components/LoginForm/index.tsx

"use client";

import { useState } from "react";
import { Input } from "../Input";
import { useInputs } from "@/hooks/useInputs";

export const LoginForm = () => {
  // 여기
  const { values, handleChange, handleDelete } = useInputs({
    email: "",
    password: "",
  });

  // 유효성 상태 추가
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // 간단한 로그인 성공 여부 모달창 띄우기 (실제로는 따로 개발하는 것이 적절)
  const [showModal, setShowModal] = useState(false);

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string) => {
    if (!email) return "이메일을 입력하세요.";
    // 간단한 이메일 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다.";
    return "";
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string) => {
    if (!password) return "비밀번호를 입력하세요.";
    if (password.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    return "";
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(e);

    // 입력값 변경 시 유효성 검사
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
    if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const onDelete = (field: keyof typeof values) => {
    handleDelete(field);
    setErrors((prev) => ({
      ...prev,
      [field]: field === "email" ? validateEmail("") : validatePassword(""),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 처리
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("로그인 요청 실패");
      }

      const data = await response.json();
      if (data.error) {
        alert("로그인 실패: " + data.error);
      } else {
        setShowModal(true);
        // alert("로그인 성공: " + data.message);
      }
    } catch (error) {
      alert("로그인 요청 중 오류 발생: " + error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-80 flex-col gap-4 bg-white p-6"
      >
        <div>
          <label htmlFor="email" className="mb-2 block">
            이메일
          </label>
          <Input
            id="email"
            name="email"
            value={values.email}
            onChange={onChange}
            type="email"
            placeholder="이메일을 입력하세요"
            isError={!!errors.email}
            errorMessage={errors.email}
            onDelete={() => onDelete("email")} // X 버튼 클릭 시 이메일 지우기
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block">
            비밀번호
          </label>
          <Input
            id="password"
            name="password"
            value={values.password}
            onChange={onChange}
            type="password"
            placeholder="비밀번호를 입력하세요"
            isError={!!errors.password}
            errorMessage={errors.password}
            onDelete={() => onDelete("password")} // X 버튼 클릭 시 비밀번호 지우기
          />
        </div>
        <button
          disabled={!values.email || !values.password}
          className="w-full cursor-pointer rounded-md bg-blue-500 p-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          로그인
        </button>
      </form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-400">
          <div className="rounded-md bg-white p-6">
            <h2 className="text-lg font-semibold">로그인 성공</h2>
            <p>환영합니다!</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};
