'use strict';

// Public fields
// Private fields
// Public methods
// Private methods
// (there is also the static variant for each)

// Public fields are present on all the instances that are created through the class
// they are not on the prototype

// Private fields are not accessible from the outside

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
  }

  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan requested');
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
