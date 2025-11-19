import { render } from "@testing-library/react";
import SnapshotButton from ".";

describe("Button 컴포넌트 스냅샷", () => {
  test("기본 Button 컴포넌트 스냅샷", () => {
    const { container } = render(<SnapshotButton>클릭하세요</SnapshotButton>);
    expect(container).toMatchSnapshot();
  });

  test("비활성화 상태", () => {
    const { container } = render(
      <SnapshotButton disabled>클릭하세요</SnapshotButton>,
    );
    expect(container).toMatchSnapshot();
  });

  test("로딩 상태", () => {
    const { container } = render(
      <SnapshotButton isLoading>클릭하세요</SnapshotButton>,
    );
    expect(container).toMatchSnapshot();
  });
});
