"use strict";
class Employee {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
    work() {
        console.log(`${this.name} is working as a ${this.position}.`);
    }
}
//상속받기
class Manager extends Employee {
    constructor(name, position, department) {
        super(name, position); //상위클래스 생성자 호출
        this.department = department;
    }
    //상속받은 메서드를 오버라이딩
    work() {
        console.log(`${this.name} is managing the ${this.department} department.`);
    }
}
const manager = new Manager("alice", "Manager", "Sales");
manager.work();
//# sourceMappingURL=over.js.map