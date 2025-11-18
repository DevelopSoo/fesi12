import { fireEvent, render, screen } from "@testing-library/react";
import { LoginButton } from ".";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { renderWithAuth } from "@/testHelpers/renderWithAuth";

describe("LoginButton 테스트", () => {
  test("인증되지 않은 경우 로그인 버튼이 렌더링되는지 확인", () => {
    renderWithAuth(<LoginButton />);

    const loginButton = screen.getByRole("button", { name: "로그인" });

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveClass("bg-blue-500");
  });

  test("인증이 된 경우에는 로그아웃 버튼이 렌더링되는지 확인", () => {
    renderWithAuth(<LoginButton />, {
      isAuthenticated: true,
      login: () => {},
      logout: () => {},
    });

    const logoutButton = screen.getByRole("button", { name: "로그아웃" });

    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass("bg-red-500");
  });

  test("로그인 버튼 클릭 시 로그인 함수가 호출이 되는지 확인", () => {
    const authValue = {
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    };
    renderWithAuth(<LoginButton />, authValue);

    // LoginButton 안에 있는 login 함수를 어떻게 가져오지...?
    const loginButton = screen.getByRole("button", { name: "로그인" });
    loginButton.click();

    expect(authValue.login).toHaveBeenCalled();
  });

  test("로그인 버튼 클릭 시 로그아웃 버튼으로 변경되는지 확인", () => {
    renderWithAuth(<LoginButton />);

    const loginButton = screen.getByRole("button", { name: "로그인" });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveClass("bg-blue-500");

    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button", { name: "로그아웃" });
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass("bg-red-500");
  });
});
