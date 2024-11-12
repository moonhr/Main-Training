//클래스는 객체를 생성하기 위한 템플릿
class Person {
  //생성자 함수 : 인스턴스를 생성할 때 호출됨. 이때 필요한 속성값을 설정.
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  //메서드 정의 : 인스턴스가 접근할 수 있는 함수.
  greet() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}
//인스턴스(객체) 생성 : 클래스를 통해 생성된 개별 데이터를 가진 실제 데이터 구조.
const person1 = new Person("alice", 25);
person1.greet();

const person2 = new Person("Bob", 30);
console.log(person1 instanceof Person); // true
console.log(person2 instanceof Person); // true
