// src/app/page.test.tsx

import { fireEvent, render, screen } from "@testing-library/react";

import CartPage from "./page";

describe("CartPage 컴포넌트 테스트", () => {
  test("로그인하지 않은 상태에서 추가 버튼 클릭 시 경고하는 alert가 호출되는지 확인", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<CartPage />);

    const addButton = screen.getByRole("button", { name: "추가" });
    fireEvent.click(addButton);

    expect(alertMock).toHaveBeenCalledWith(
      "로그인하지 않으면 추가할 수 없습니다.",
    );
    alertMock.mockRestore();
  });

  test("로그인 후 추가 버튼 클릭 시 count 증가되는지 확인", () => {
    render(<CartPage />);

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);
    expect(screen.getByText("로그인됨: user@example.com")).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: "추가" });
    fireEvent.click(addButton);

    expect(screen.getByText("상품 개수: 1")).toBeInTheDocument();
  });

  test("상품이 0개일 때 제거 버튼 비활성화", () => {
    render(<CartPage />);

    const removeButton = screen.getByRole("button", { name: "제거" });
    expect(removeButton).toBeDisabled();
  });

  test("상품 추가(로그인된 상태) 후 제거 시 count 감소", () => {
    render(<CartPage />);

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);
    expect(screen.getByText("로그인됨: user@example.com")).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: "추가" });
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const removeButton = screen.getByRole("button", { name: "제거" });
    fireEvent.click(removeButton);

    expect(screen.getByText("상품 개수: 1")).toBeInTheDocument();
  });
});
