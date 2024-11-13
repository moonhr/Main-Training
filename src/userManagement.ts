import { User } from "./user";
export class UserManagement {
  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
    console.log(`${user.name} has been added.`);
  }

  removeUser(name: string) {
    this.users = this.users.filter((user) => user.name !== name);
    console.log(`${name} has been removed.`);
  }

  listUsers() {
    console.log("User List:");
    return this.users.map((user) => user.name);
  }
}

const userManagement = new UserManagement();
userManagement.addUser(new User("alice", "password123", "user"));
userManagement.addUser(new User("Bob", "pass456", "admin"));
userManagement.listUsers();
userManagement.removeUser("Alice");
userManagement.listUsers();
