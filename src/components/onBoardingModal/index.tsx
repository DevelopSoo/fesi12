// src/components/OnboardingModal/index.tsx

"use client";

import { deleteCookie, isCookieExists, setCookie } from "@/lib/cookies";
import { useState } from "react";

export default function OnboardingModal() {
  const [showModal, setShowModal] = useState(() => {
    return typeof window !== "undefined" && !isCookieExists("isModalHidden");
  });

  const handleCheckboxChange = () => {
    if (isCookieExists("isModalHidden")) {
      deleteCookie("isModalHidden");
    } else {
      // 24시간 후 만료되는 쿠키 설정
      setCookie("isModalHidden", "true", {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        path: "/",
      });
    }
  };

  const handleClose = () => setShowModal(false);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">안내</h2>
        <p className="mb-4">환영합니다! 이것은 모달창입니다.</p>
        <div className="flex justify-end gap-2">
          <label htmlFor="modalCheckbox" className="flex items-center gap-2">
            <input
              type="checkbox"
              id="modalCheckbox"
              onChange={handleCheckboxChange}
            />
            오늘 하루 보지 않기
          </label>
          <button
            onClick={handleClose}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
