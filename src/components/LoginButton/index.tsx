// src/components/LoginButton/index.tsx

"use client";

import { useAuth } from "@/contexts/AuthContext";

export const LoginButton = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <button
      onClick={isAuthenticated ? logout : login}
      className={`px-4 py-2 ${
        isAuthenticated ? "bg-red-500" : "bg-blue-500"
      } rounded text-white`}
    >
      {isAuthenticated ? "로그아웃" : "로그인"}
    </button>
  );
};
