// src/utils/sum.test.ts
import sum from "./sum";

test("1 + 2는 3이 되어야 함", () => {
  expect(sum(1, 2)).toBe(3);
});
