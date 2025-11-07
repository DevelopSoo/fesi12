import clsx from "clsx";

type CardProps = {
  children: React.ReactNode;
  variant: "default" | "outlined" | "elevated";
  padding: "none" | "sm" | "md" | "lg";
  radius: "none" | "sm" | "md" | "lg" | "full";
};

export default function Card({
  children,
  variant = "default",
  padding = "md",
  radius = "md",
}: CardProps) {
  const cardClasses = clsx(
    // 기본 스타일
    "overflow-hidden max-w-md transition-all",

    // 패딩 설정
    {
      "p-0": padding === "none",
      "p-3": padding === "sm",
      "p-5": padding === "md",
      "p-8": padding === "lg",
    },

    // 테두리 반경
    {
      "rounded-none": radius === "none",
      "rounded-sm": radius === "sm",
      "rounded-md": radius === "md",
      "rounded-lg": radius === "lg",
      "rounded-full": radius === "full",
    },

    // 카드 변형
    {
      "bg-white border border-gray-200": variant === "default",
      "bg-white border border-gray-500 hover:border-gray-400":
        variant === "outlined",
      "bg-white shadow-lg hover:shadow-xl": variant === "elevated",
    },
  );
  return <div className={cardClasses}>{children}</div>;
}
