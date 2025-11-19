// src/app/page.test.tsx

import { render, screen } from "@testing-library/react";
import Home from "./page";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("MSW 모킹 테스트", () => {
  test("MSW 상세 데이터 모킹", async () => {
    render(<Home />);

    const postItem = await screen.findByText("1: 상세 데이터");

    // MSW에서 설정한 결과값이 화면에 잘 나오는지 확인
    expect(postItem).toBeInTheDocument();
  });

  // 와이파이 끊김, 서버 끊김...
  test("네트워크 에러 발생 시 모킹 테스트", async () => {
    // server.use(
    //   http.get("http://localhost:4000/posts/1", () => {
    //     return HttpResponse.error();
    //   }),
    // );

    server.use(
      http.get("http://localhost:4000/posts/1", () => {
        return HttpResponse.json(null, { status: 500 });
      }),
    );

    render(<Home />);
    const errorMessage = await screen.findByText(
      "데이터를 불러오는 중 오류가 발생했습니다.",
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
