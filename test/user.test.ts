import { User } from "../src/user";

describe("User Class Test", () => {
  let user: User;

  beforeEach(() => {
    user = new User("Alice", "oldPassword", "manager");
  });

  test("생성 테스트", () => {
    expect(user.name).toBe("Alice");
  });

  test("비밀번호 변경 테스트", () => {
    const result = user.changePassword("newPassword123");
    expect(result).toBe(true);
  });

  test("비밀번호 변경시 길이 체크 테스트", () => {
    const result = user.changePassword("123");
    expect(result).toBe(false);
  });
});
