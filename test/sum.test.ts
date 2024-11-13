import { sum } from "../src/sum";

//1+2가 정확히 3이 나오는지 확인
test("1+2 = 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("5+7=12", () => {
  expect(sum(5, 7)).toBe(12);
});
