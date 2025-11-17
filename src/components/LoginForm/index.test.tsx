import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from ".";

test("로그인 폼의 이메일 혹은 비밀번호 미입력 시 로그인 버튼 비활성화되는지 확인", () => {
  render(<LoginForm />);

  // 입력이 안됐는지 확인
  const emailInput = screen.getByLabelText("이메일");
  const passwordInput = screen.getByLabelText("비밀번호");

  expect(emailInput).toHaveValue("");
  expect(passwordInput).toHaveValue("");
  // 버튼이 비활성화되는지 확인

  const loginButton = screen.getByRole("button", { name: "로그인" });
  expect(loginButton).toBeDisabled();
});

test("이메일, 비밀번호 입력 시 버튼이 활성화되는지 확인", () => {
  render(<LoginForm />);

  // 입력이 안됐는지 확인
  const emailInput = screen.getByLabelText("이메일");
  const passwordInput = screen.getByLabelText("비밀번호");
  const loginButton = screen.getByRole("button", { name: "로그인" });

  // event 객체
  // event.target.value => 입력된 값 확인
  fireEvent.change(emailInput, { target: { value: "test" } });
  fireEvent.change(passwordInput, { target: { value: "test" } });

  expect(loginButton).toBeEnabled();
});

test("이메일 잘못 입력 시 '올바른 이메일 형식이 아닙니다' 라는 에러 메세지가 표시되는지 확인", () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText("이메일");

  fireEvent.change(emailInput, { target: { value: "invalid-email" } });

  const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
  expect(errorMessage).toBeInTheDocument();
});

test("비밀번호 6자 미만 입력 시 '비밀번호는 6자 이상이어야 합니다.'라는 에러 메시지가 표시되는지 확인", () => {
  render(<LoginForm />);

  const passwordInput = screen.getByLabelText("비밀번호");

  // 잘못된 비밀번호 입력
  fireEvent.change(passwordInput, { target: { value: "12345" } });

  // 에러 메시지 확인
  const errorMessage = screen.getByText("비밀번호는 6자 이상이어야 합니다.");
  expect(errorMessage).toBeInTheDocument();
});

test("제대로 된 이메일 입력 시 에러 메세지가 사라지는지 확인", () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText("이메일");

  // 1. 잘못된 이메일 입력 후 에러 메세지 나오는지 확인
  fireEvent.change(emailInput, { target: { value: "test" } });
  const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
  expect(errorMessage).toBeInTheDocument();

  // 2. 올바른 이메일 입력 후 에러 메세지 사라지는지 확인
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(errorMessage).not.toBeInTheDocument();
});
