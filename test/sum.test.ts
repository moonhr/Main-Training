import { sum } from "../src/sum";

//1+2가 정확히 3이 나오는지 확인
test("1+2 = 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("5+7=12", () => {
  expect(sum(5, 7)).toBe(12);
});

test("number comparisons", () => {
  expect(5 + 5).toBe(10); // ===로 비교
  expect({ a: 1 }).toEqual({ a: 1 }); //객체 구조가 같은지 비교
  expect(null).toBeNull(); // 값이 null인지 비교
  expect([1, 2, 3]).toContain(2); // 배열에 특정 값이 포함되었는지 비교
  expect("Hello").toMatch(/Hello/); // 정규식 일지 확인
});
