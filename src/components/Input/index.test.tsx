import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";
import { useState } from "react";

test("Input 컴포넌트 미입력 시 X 버튼이 보이지 않는지 테스트", () => {
  render(<Input onChange={jest.fn()} onDelete={jest.fn()} />);

  // 1. input 을 가져온다 -> 입력값이 존재하는지 확인
  const input = screen.getByRole("textbox");
  // get -> 없으면 에러난다.
  // query -> 없으면 null 반환
  const deleteButton = screen.queryByRole("button", { name: "입력값 지우기" });

  // 2. 입력값이 없는지 확인
  expect(input).toHaveValue("");
  // X 버튼이 보이지 않아야 한다.
  expect(deleteButton).not.toBeInTheDocument();
});

test("Input 컴포넌트 입력 시 X 버튼이 보이는지 테스트", () => {
  render(<Input value="입력값" onChange={jest.fn()} onDelete={jest.fn()} />);
  const input = screen.getByRole("textbox");
  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  expect(input).toHaveValue("입력값");
  expect(deleteButton).toBeInTheDocument();
});

test("X 버튼 클릭 시 입력값이 지워지는지 테스트", () => {
  // Input을 감싸는 컴포넌트를 테스트한다. ex) LoginForm 에서 테스트한다.
  const Wrapper = () => {
    const [value, setValue] = useState("입력값");

    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onDelete={() => setValue("")}
      />
    );
  };
  render(<Wrapper />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // 입력값이 지워지고,
  expect(input).toHaveValue("");
  // X 버튼이 사라진다.
  expect(deleteButton).not.toBeInTheDocument();
});

test("Input 컴포넌트에 (유효성) 에러 시 에러 메세지가 발생하는지 확인", () => {
  render(
    <Input
      isError={true}
      errorMessage="입력값에 문제가 있습니다"
      onChange={jest.fn()}
      onDelete={jest.fn()}
    />,
  );

  const errorMessage = screen.getByText("입력값에 문제가 있습니다");

  expect(errorMessage).toBeInTheDocument();
});
