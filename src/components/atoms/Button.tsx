// src/components/atoms/Button.tsx

export default function Button({
  onClick,
  children,
  type = "button",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-fit rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium whitespace-nowrap text-white hover:bg-blue-800"
    >
      {children}
    </button>
  );
}
