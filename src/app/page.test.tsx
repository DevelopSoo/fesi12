import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const renderWithQueryClient = (component: React.ReactElement) => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity, // 타이머 설정 X
      },
    },
  });

  return render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>,
  );
};

describe("메인 페이지 테스트", () => {
  describe("게시물 조회 테스트", () => {
    test("초기에 로딩 상태가 올바르게 표시되는지 확인", () => {
      renderWithQueryClient(<Home />);

      const loadingElement = screen.getByText("Loading...");
      expect(loadingElement).toBeInTheDocument();
    });

    test("데이터가 성공적으로 렌더링되는지 확인", async () => {
      const mockedPosts = [
        { id: 1, title: "테스트 제목", body: "테스트 본문" },
        { id: 2, title: "두번째 제목", body: "두번째 본문" },
      ];

      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockedPosts),
      });

      renderWithQueryClient(<Home />);

      await waitFor(() => {
        // 로직을 자유롭게
        const postItems = screen.getAllByRole("listitem");
        expect(postItems).toHaveLength(mockedPosts.length);

        expect(screen.getByText("1: 테스트 제목")).toBeInTheDocument();
        expect(screen.getByText("2: 두번째 제목")).toBeInTheDocument();
      });
    });

    test("API 호출 실패 시 에러 상태가 올바르게 표시되는지 확인", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      });

      renderWithQueryClient(<Home />);

      await waitFor(() => {
        const errorElement = screen.getByText(
          "서버에서 데이터를 가져오는데 실패했습니다.",
        );
        expect(errorElement).toBeInTheDocument();
      });
    });
  });

  describe("게시물 생성 테스트", () => {
    test("새로운 게시물이 성공적으로 렌더링되는지 확인", async () => {
      // 처음에 렌더링이 잘되는지도 미리 봐야하고
      const mockedPosts = [
        { id: 1, title: "테스트 제목", body: "테스트 본문" },
        { id: 2, title: "두번째 제목", body: "두번째 본문" },
      ];

      const newPost = { id: 3, title: "새로운 제목", body: "새로운 본문" };

      // 처음에 데이터를 조회하는 fetch API 모킹
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(mockedPosts),
        })
        // 데이터 추가할 때의 fetch API 모킹
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(newPost),
        })
        // invalidateQueries로 다시 데이터를 조회할 때의 fetch API 모킹
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue([...mockedPosts, newPost]),
        });

      renderWithQueryClient(<Home />);

      await waitFor(() => {
        // 로직을 자유롭게
        const postItems = screen.getAllByRole("listitem");
        expect(postItems).toHaveLength(mockedPosts.length);

        expect(screen.getByText("1: 테스트 제목")).toBeInTheDocument();
        expect(screen.getByText("2: 두번째 제목")).toBeInTheDocument();
      });

      // 입력도 해야되고
      const titleInput = screen.getByLabelText("제목");
      const bodyInput = screen.getByLabelText("본문");
      const submitButton = screen.getByRole("button", { name: "제출" });

      fireEvent.change(titleInput, { target: { value: "새로운 제목" } });
      fireEvent.change(bodyInput, { target: { value: "새로운 본문" } });
      fireEvent.click(submitButton);

      // 입력 후에 제출하면 새로운 항목이 나오는지도 봐야한다.

      await waitFor(() => {
        const postItems = screen.getAllByRole("listitem");
        expect(postItems).toHaveLength(mockedPosts.length + 1);

        expect(screen.getByText("3: 새로운 제목")).toBeInTheDocument();
        expect(screen.getByText("새로운 본문")).toBeInTheDocument();
      });
    });
  });
});
