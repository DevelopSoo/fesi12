import { render } from "@testing-library/react";
import Card from ".";

test("Card 컴포넌트 스냅샷", () => {
  const { container } = render(
    <Card
      title="테스트 카드"
      description="이것은 테스트용 카드 컴포넌트입니다."
      imageUrl="https://via.placeholder.com/150"
    />,
  );
  expect(container).toMatchSnapshot();
});
