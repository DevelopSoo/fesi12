// src/components/Input/index.tsx

"use client";

import { useState } from "react";
import { DeleteIconButton } from "./DeleteIconButton";

interface InputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number"; // 필요한 타입을 추가할 수 있습니다.
  placeholder?: string;
  // 추가적인 props가 필요하다면 여기에 정의할 수 있습니다.
  isError?: boolean;
  errorMessage?: string;
  onDelete: () => void;
}
export const Input = ({
  id,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  isError = false,
  errorMessage = "",
  onDelete,
}: InputProps) => {
  const borderColor = isError ? "border-red-500" : "border-gray-300";
  return (
    <div className="relative inline-block w-full">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border p-2 pr-8 ${borderColor} w-full rounded-md`}
      />
      {value && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-1/2 right-2 -translate-y-1/2 transform cursor-pointer"
          aria-label="입력값 지우기"
        >
          <DeleteIconButton />
        </button>
      )}
      {isError && (
        <span className="mt-1 ml-1 text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};
