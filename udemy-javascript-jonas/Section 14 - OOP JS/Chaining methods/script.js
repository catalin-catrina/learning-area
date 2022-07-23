'use strict';

// In order to chain methods we have to return the object from methods (usually that set
// some property, e.g deposit and withdraw change the movements array), otherwise if
// we don't return anything from a method, it will return undefined, and we can't chain
// another method on top of it because it's like doing undefined.ourMethod() and we get
// an error

class Account {
  // Public fields
  locale = navigator.language;

  // Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Pubic methods
  // API
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan requested');
      return this;
    }
  }

  // Static method
  static helper() {
    console.log('Helper');
  }

  // Private methods
  #approveLoan(val) {
    return true;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(140);

console.log(acc1);

// property #movements is not accessible outside class Account because it has a
// private identified #
// console.log(acc1.#movements);

// We can still get the movements through the public interface, but not modify it
console.log(acc1.getMovements());

// Static methods can only be called on the object they are defined in
Account.helper();

// CHAINING METHODS
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
