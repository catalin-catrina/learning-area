'use strict';

// When we only expose a small interface (API) consisting of only a few public methods,
// then we can change all the other internal methods with more confidence, because
// we can be sure that external code does not rely on these private methods, therefore
// our code will not break when we make internal changes.

// JavaScript classes do not yet support real data privacy and encapsulation, so all
// we can do for now is to fake encapsulation by simply using a convention

// the first candidate to protect is the movements array so that noone can accidentally
// manipulate it (add an _ before the property name)
// this does not make the property truly private because it's just a convention, something
// devs agreed to use, which will make you and other devs know this is not a property
// you're supposed to touch outside of the class

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // protected properties
    this._movements = [];
    this._pin = pin;

    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // We also protect the approveLoan method because it should only be used internally
  // if the loan should be approved
  // NOT part of the API
  _approveLoan() {
    return true;
  }

  // API
  // We build a public interface to interact with the properties for us, it's better
  // than manipulating the properties ourselves to avoid bugs
  // it's common to use a method called getX or setX instead of using a real getter
  // or setter
  // the correct way to get the movements, we implement a public method for it
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  // We abstract away the fact that withdrawing money is in reality just depositing
  // but with a minus - in front. We abstract away from the user the need to use -
  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this._approveLoan()) {
      this.deposit(val);
      console.log('Loan requested');
    }
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);

// We shouldn't interact with the properties ourselves, we should instead encapsulate it
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
// acc1.approveLoan(1000);

// Everyone can access the movements now by calling this method, but they can't
// overwrite them, unless they use the _ with the convention but then they at least know
// they shouldn't and are doing it on purpose
console.log(acc1.getMovements());
