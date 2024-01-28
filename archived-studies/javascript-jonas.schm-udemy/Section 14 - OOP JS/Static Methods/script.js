'use strict';

// Static methods are not available on the instances, only on the constructor
// function / class
// sometimes useful to implement some kind of helper function about a constructor
// function

// The from method is a method that's attached on the Array constructor won't be
// inherited by the arrays created with the Array constructor function
// from is attached to the constructor, not to the prototype propery of the constructor
// we can also say that the from method is in the Array namespace
// another example is Number.parseFloat

// Ex: Array.from is a static method
// Array.from transforms an array-like structure into an array
console.log(document.querySelectorAll('h1')); // node list
console.log(Array.from(document.querySelectorAll('h1'))); // array

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.hey = function () {
  console.log('Hey there 👏');
};
Person.hey();

const jonas = new Person('jonas', 1991);

// can't call hey() on the jonas object because it's not on jonas' prototype
// it's not inside Person.prototype so the object referenced to by the jonas variable
// does not inherit it
// jonas.hey(); // error

Person.hey(); // Hey there 👏

class PersonClass {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Instance method - will be added to .prototype property
  bye() {
    console.log('Bye bye 🤖');
  }

  // Static method - won't be added to .prototype property
  static hey() {
    console.log('Hi there 🙋‍♀️');
  }
}
