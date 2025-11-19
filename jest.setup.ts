import "@testing-library/jest-dom";
import { server } from "@/mocks/server";

// npm run test -> 모든 테스트 전에 한 번만 서버를 열겠다.
beforeAll(() => server.listen());
// 각 테스트가 끝날 때마다 핸들러 초기화
afterEach(() => server.resetHandlers());
// 모든 테스트가 끝난 후 서버 종료
afterAll(() => server.close());
