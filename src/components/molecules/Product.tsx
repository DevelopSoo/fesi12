// src/components/molecules/Product.tsx

import Title from "../atoms/Title";
import Content from "../atoms/Content";

export default function Product({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <Title>제목: {title}</Title>
      <Content>내용: {content}</Content>
    </div>
  );
}
