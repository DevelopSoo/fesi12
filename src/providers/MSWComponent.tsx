// src/providers/MSWComponent.tsx

"use client";

import { useEffect, useState } from "react";
import { initMocks } from "@/mocks";

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  // msw 준비상태가 false다 -> 초기 상태
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // 모킹 실행한다.
      await initMocks();
      // 준비상태를 true
      setMswReady(true);
    };

    // 준비상태가 false면 모킹 실행
    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  // msw 준비되지 않으면 아무것도 안보여줄거야
  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
};
