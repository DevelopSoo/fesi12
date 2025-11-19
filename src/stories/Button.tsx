import "./button.css";

export interface ButtonProps {
  /** 주요한 버튼인지 여부 */
  primary?: boolean;
  /** 버튼의 배경색 */
  backgroundColor?: string;
  /** 버튼의 크기 */
  size?: "small" | "medium" | "large";
  /** 버튼 내용 */
  label: string;
  /** 선택적 클릭 핸들러 */
  onClick?: () => void;
}

/** 주요 UI 컴포넌트 for user interaction */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "bg-blue-500 text-white"
    : "storybook-button--secondary";
  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " ",
      )}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
