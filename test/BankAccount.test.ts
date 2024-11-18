import { BankAccount } from "../src/BankAccount";

describe("BankAccount Test", () => {
  let account: BankAccount;

  //실행 전 초기화
  beforeEach(() => {
    account = new BankAccount("Alice", 1000);
  });

  it("입금테스트", () => {
    account.deposit(500);
    expect(account.getBalance()).toBe(1500);
  });

  it("출금 테스트", () => {
    account.withdraw(500);
    expect(account.getBalance()).toBe(500);
  });

  it("잔액부족 테스트", () => {
    expect(() => {
      account.withdraw(1500);
    }).toThrow("");
  });

  it("송금 테스트", () => {
    const targetAccount = new BankAccount("Bob", 500);
    account.transfer(targetAccount, 300);

    expect(account.getBalance()).toBe(700);
    expect(targetAccount.getBalance()).toBe(800);
  });

  it("음수 입금 오류", () => {
    expect(() => {
      account.deposit(-500);
    }).toThrow("");
  });

  it("비동기 송금 기능 테스트", async () => {
    const targetAccount = new BankAccount("Bob", 500);
    await account.transferAsync(targetAccount, 300);

    expect(account.getBalance()).toBe(700);
    expect(targetAccount.getBalance()).toBe(800);
  })
});
