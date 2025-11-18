// src/contexts/AuthContext.tsx

"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export interface AuthContextType {
  // 인증이 됐는지
  isAuthenticated: boolean;
  // 로그인 -> 인증됐다!
  login: () => void;
  // 로그아웃 -> 인증 없애는 것
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    // value에 들어가있는 놈들을 children에서 쓸 수 있다.
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {/* 여기 내부에서만 context를 사용할 수 있다. */}
      {children}
    </AuthContext.Provider>
  );
};

// 훅으로 분리해도 상관없습니다.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서 사용되어야 합니다.");
  }
  return context;
};
