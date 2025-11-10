// src/components/molecules/SearchForm.tsx

"use client";

import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function SearchForm() {
  return (
    <form className="flex max-w-md items-center justify-center gap-4">
      <Input id="search" placeholder="검색어를 입력하세요" />
      <Button type="submit">검색</Button>
    </form>
  );
}
