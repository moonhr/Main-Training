export class User {
  public name: string; // 외부접근 허용
  private password: string; // 클래스 내부에서만 접근 가능
  protected role: string; //상속받은 클래스까지 접근 가능

  constructor(name: string, password: string, role: string) {
    this.name = name;
    this.password = password;
    this.role = role;
  }
  greet() {
    console.log(`Hello, ${this.name}`);
  }
  private validatePassword(password: string): boolean {
    return this.password === password;
  }

  changePassword(newPassword: string) {
    if (newPassword.length >= 6) {
      this.password = newPassword;
      return true;
    } else {
      return false;
    }
  }
}

const user = new User("julia", "pass123", "admin");
user.greet();
