import { UserManagement } from "../src/userManagement";
import { User } from "../src/user";

describe("UserManagement Test", () => {
  let userManagement: UserManagement;

  beforeEach(() => {
    userManagement = new UserManagement();
  });

  test("add user test", () => {
    const user = new User("Alice", "password123", "manager");
    userManagement.addUser(user);
    expect(userManagement.listUsers()).toContain(user.name);
  });

  test("remove user test", () => {
    const user = new User("Alice", "password123", "manager");
    userManagement.addUser(user);
    userManagement.removeUser(user.name);
    expect(userManagement.listUsers()).not.toContain(user.name);
  });
});
