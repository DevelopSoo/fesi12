"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export const TypingEffect = ({
  text,
  typingSpeed = 150,
}: {
  text: string;
  typingSpeed?: number;
}) => {
  // 현재 입력된 텍스트
  const [displayText, setDisplayText] = useState("");
  // 현재 입력된 텍스트의 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // text: "오늘은 러닝 어떤가요?"
    // 입력하고 있는 위치(인덱스)가 text보다 커지기 전까지 반복
    // 오: 0
    // 늘: 1
    // 은: 2
    //   :3
    // 러: 4
    //...: 11
    let timer: NodeJS.Timeout | undefined;
    if (currentIndex < text.length) {
      timer = setTimeout(() => {
        // displayText: "" -> "오" -> "오늘" -> "오늘은" ...
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, text, typingSpeed]);

  return (
    <div className="font-mono text-2xl">
      {/* 현재 입력된 텍스트 */}
      {displayText}
      {/* 깜빡거리는 타이핑 커서 */}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1 inline-block h-5 w-2 bg-black"
      />
    </div>
  );
};

// 사용 예시
export default function TypingEffectExample() {
  return (
    <div className="p-8">
      <TypingEffect text="오늘은 러닝 어떤가요?" typingSpeed={100} />
    </div>
  );
}
