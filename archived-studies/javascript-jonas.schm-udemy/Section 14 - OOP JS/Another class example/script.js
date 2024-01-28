'use strict';

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // We build a public interface to interact with the properties for us, it's better
  // than manipulating the properties ourselves to avoid bugs
  deposit(val) {
    this.movements.push(val);
  }

  // We abstract away the fact that withdrawing money is in reality just depositing
  // but with a minus - in front. We abstract away from the user the need to use -
  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan() {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan()) {
      this.deposit(val);
      console.log('Loan requested');
    }
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);

// We shouldn't interact with the properties ourselves
// acc1.movements.push(250);
// acc1.movements.push(-140);

// Instead, it's better to build methods (a public interface) to do it for us (API)
acc1.deposit(250);
acc1.withdraw(140);

console.log(acc1);

acc1.requestLoan(1000);

// acc1.approveLoan is an internal method that only the requestLoan method should be able
// to use, but here we can call it from outside the Account object
// we need data encapsulation and data privacy to tackle this problem
acc1.approveLoan(1000);
