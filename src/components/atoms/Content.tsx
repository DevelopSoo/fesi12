// src/components/atoms/Content.tsx

export default function Content({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}
