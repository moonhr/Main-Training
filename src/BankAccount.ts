export class BankAccount {
  private balance: number;

  //계좌 소유자의 이름과 초기 잔액을 가짐.
  //잔액 없으면 에러
  constructor(public owner: string, initialBalance: number) {
    if (initialBalance < 0)
      throw new Error("Initial balance cannot be negative");
    this.balance = initialBalance;
  }

  //잔액 조회
  getBalance() {
    return this.balance;
  }

  //입금
  deposit(amount: number) {
    if (amount <= 0) throw new Error("");
    this.balance += amount;
  }
  //출금
  withdraw(amount: number) {
    if (amount <= 0) throw new Error("");
    if (this.balance < amount) throw new Error("");
    this.balance -= amount;
  }
  //송금
  transfer(targetAccount: BankAccount, amount: number) {
    if (amount <= 0) throw new Error("");
    if (this.balance < amount) throw new Error("");
    this.withdraw(amount);
    targetAccount.deposit(amount);
  }

  async transferAsync(targetAccount: BankAccount, amount: number) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.withdraw(amount);
    targetAccount.deposit(amount);
  }
}
