"use strict";
class User {
    constructor(name, password, role) {
        this.name = name;
        this.password = password;
        this.role = role;
    }
    greet() {
        console.log(`Hello, ${this.name}`);
    }
    validatePassword(password) {
        return this.password === password;
    }
}
const user = new User("julia", "pass123", "admin");
user.greet();
//# sourceMappingURL=inheritance.js.map