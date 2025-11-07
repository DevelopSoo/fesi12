import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isDisabled = false,
}: ButtonProps) => {
  const buttonClasses = clsx(
    // 기본 스타일
    "rounded font-medium focus:outline-none transition-colors focus:ring-2 focus:ring-offset-2",

    // 버튼 크기 (size)
    {
      "px-3 py-1 text-sm": size === "sm",
      "px-4 py-2 text-base": size === "md",
      "px-6 py-3 text-lg": size === "lg",
    },

    // 버튼 변형 (variant)
    {
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500":
        variant === "primary",
      "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500":
        variant === "secondary",
      "border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500":
        variant === "outline",
    },

    // 비활성화 상태
    isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
  );

  return (
    <button className={buttonClasses} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
