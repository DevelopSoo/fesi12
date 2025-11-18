import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch 테스트", () => {
  test("데이터를 성공적으로 가져오는지 테스트", async () => {
    const mockData = { name: "Test Data" };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result } = renderHook(() => useFetch("실제주소"));

    // 초기값이 잘 되어있는지 확인
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // 로딩이 false로 바뀌었는지 확인
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    // 에러는 실행 안됨
    expect(result.current.error).toBeNull();
  });

  test("에러 처리가 정상적으로 작동하는지 테스트", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useFetch("잘못된주소"));

    // 초기값이 잘 되어있는지 확인
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("네트워크 응답에 문제가 있습니다.");
  });

  test("네트워크 에러일 때 테스트", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("네트워크 에러"));

    const { result } = renderHook(() => useFetch("잘못된주소"));

    // 초기값 확인

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("네트워크 에러");
    // 데이터 확인
  });
});
