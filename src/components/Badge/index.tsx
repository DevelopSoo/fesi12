import clsx from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  size?: "xs" | "sm" | "md";
  outlined?: boolean;
  rounded?: boolean;
  withDot?: boolean;
};

export default function Badge({
  children,
  variant = "primary",
  size = "sm",
  outlined = false,
  rounded = false,
  withDot = false,
}: BadgeProps) {
  const badgeClasses = clsx(
    "inline-flex items-center font-medium",
    // 크기 설정
    {
      "text-xs px-1.5 py-0.5": size === "xs",
      "text-sm px-2.5 py-0.5": size === "sm",
      "text-base px-3 py-1": size === "md",
    },

    // 모서리
    {
      rounded: !rounded,
      "rounded-full": rounded,
    },

    // variant 설정
    // 변형 및 색상 설정
    {
      // 기본(채워진) 스타일
      "bg-blue-600 text-white": variant === "primary" && !outlined,
      "bg-green-100 text-green-800": variant === "success" && !outlined,
      "bg-yellow-100 text-yellow-800": variant === "warning" && !outlined,
      "bg-red-100 text-red-800": variant === "danger" && !outlined,
      "bg-blue-100 text-blue-800": variant === "info" && !outlined,

      // 아웃라인 스타일
      "bg-transparent border": outlined,
      "border-blue-500 text-blue-500": variant === "primary" && outlined,
      "border-green-500 text-green-500": variant === "success" && outlined,
      "border-yellow-500 text-yellow-500": variant === "warning" && outlined,
      "border-red-500 text-red-500": variant === "danger" && outlined,
      "border-blue-400 text-blue-400": variant === "info" && outlined,
    },
  );

  // 상태 표시 점의 색상
  const dotColorClasses = {
    "bg-blue-500": variant === "primary",
    "bg-green-500": variant === "success",
    "bg-yellow-500": variant === "warning",
    "bg-red-500": variant === "danger",
    "bg-blue-400": variant === "info",
  };

  return (
    <span className={badgeClasses}>
      {withDot && (
        <span
          className={clsx("mr-1.5 size-2 rounded-full", dotColorClasses)}
        ></span>
      )}

      {children}
    </span>
  );
}
