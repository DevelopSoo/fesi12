import { render, screen } from "@testing-library/react";
import TodoItem from ".";

test("할 일 목록 테스트", () => {
  render(<TodoItem task="리액트 공부하기" completed={true} />);

  // 텍스트가 올바르게 렌더링되는지 확인
  // <span>리액트 공부하기</span>
  const taskText = screen.getByText("리액트 공부하기");
  // <span>리액트 공부하기</span>
  expect(taskText).toHaveTextContent("리액트 공부하기");

  // 체크박스가 체크되어 있는지 확인
  // <input type="checkbox" checked={true} disabled={true} />
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeChecked();
  // 비활성화 됐는지
  expect(checkbox).toBeDisabled();

  const editButton = screen.getByRole("button", { name: "수정" });
  expect(editButton).toBeDisabled();

  const listItem = screen.getByRole("listitem");
  expect(listItem).toHaveClass("completed");
});
