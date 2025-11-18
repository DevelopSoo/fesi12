import { act, renderHook } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter 테스트", () => {
  test("useCounter 훅의 파라미터 값이 초기값으로 잘 세팅이 되는지 확인", () => {
    const { result } = renderHook(() => useCounter(5));

    // result 안에 있는 count가 5로 세팅이 됐는지 확인
    expect(result.current.count).toBe(5);
  });

  test("increment 함수가 count 값을 1 증가시키는지 확인", () => {
    const { result } = renderHook(() => useCounter(0));
    // 처음 값이 0인지 확인
    expect(result.current.count).toBe(0);

    // increment 함수를 실행하고
    act(() => {
      result.current.increment();
    });
    // 1로 변했는지
    expect(result.current.count).toBe(1);
  });

  test("decrement 함수가 count 값을 1 감소시키는지 확인", () => {
    const { result } = renderHook(() => useCounter(2));
    expect(result.current.count).toBe(2);

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(1);
  });

  test("reset 함수가 count 값을 초기값으로 되돌리는지 확인", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(4);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(3);
  });
});
