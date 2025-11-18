import { act, renderHook } from "@testing-library/react";
import { useInputs } from "./useInputs";

describe("useInputs 훅 테스트", () => {
  test("초기값이 올바르게 세팅이 되는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({
        name: "",
        nickname: "",
      }),
    );

    expect(result.current.values).toEqual({
      name: "",
      nickname: "",
    });
  });

  test("handleChange 함수가 값을 올바르게 업데이트하는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({
        name: "",
        nickname: "",
      }),
    );

    const event = {
      target: {
        name: "name",
        value: "박성우",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values.name).toBe("박성우");
  });

  test("여러 값을 업데이트할 때도 올바르게 업데이트되는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({
        name: "",
        nickname: "",
      }),
    );

    const event = {
      target: {
        name: "name",
        value: "박성우",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    const nicknameEvent = {
      target: {
        name: "nickname",
        value: "박서준",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
      result.current.handleChange(nicknameEvent);
    });

    expect(result.current.values.name).toBe("박성우");
    expect(result.current.values.nickname).toBe("박서준");
  });

  test("handleDelete 함수가 특정 필드를 올바르게 삭제하는지 확인", () => {
    const { result } = renderHook(() => {
      return useInputs({
        name: "박성우",
        nickname: "박서준",
      });
    });

    act(() => {
      result.current.handleDelete("name");
    });

    expect(result.current.values).toEqual({
      name: "",
      nickname: "박서준",
    });
  });
});
