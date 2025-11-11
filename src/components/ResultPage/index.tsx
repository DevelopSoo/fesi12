"use client";

import * as m from "motion/react-m";

export default function Home() {
  return (
    <m.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      왼쪽에서 슬라이드 인!
    </m.div>
  );
}
