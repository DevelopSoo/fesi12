export default function Input({ placeholder }: { placeholder?: string }) {
  return (
    <input
      className="input"
      placeholder={placeholder || "검색어를 입력하세요"}
    />
  );
}
