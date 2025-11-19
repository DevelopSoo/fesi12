"use client";

import { Button } from "@/stories/Button";

export default function Home() {
  return (
    <>
      <Button
        label="스토리북 버"
        primary
        backgroundColor="red"
        size="large"
        onClick={() => {
          alert("안녕?");
        }}
      />
    </>
  );
}
