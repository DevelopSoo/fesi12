// src/app/auth/signup/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`회원가입이 완료됐습니다. ${values.email}님 환영합니다.`);
    router.push("/auth/login");
  };

  return (
    <>
      <h1>회원가입 페이지</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">회원가입</button>
      </form>
      <Link href="/auth/login">로그인 페이지로 이동</Link>
    </>
  );
}
