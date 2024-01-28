'use strict';

const Person0 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person0.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// Syntactic sugar
// Behind the scenes classes are just functions - therefore we have class expressions
// and class declarations
// Classes just hide the true nature of constructor functions and prototypal inheritance
// in JavaScript

// class expression
const Person1 = class {};

// class declaration
// all of the methods we write inside the class {} and outside of the constructor {}
// will be added on the .prototype property of the class (function) and all instances
// of that class (constructor function) will inherit it
class Person2 {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Adding a method here ...
  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

// Is the same as actually adding it this way - which is what actually happens
// behind the scenes anyway with the calcAge() function as well
Person2.prototype.greet = function () {
  console.log(`Hey, ${this.firstName}`);
};

const jessica = new Person2('Jessica', 1996);

console.log(jessica);
jessica.calcAge(); // 41
jessica.greet(); // Hey, Jessica

console.dir(Person2);
console.log(Object.getPrototypeOf(jessica) === Person2.prototype); // true

// Classes are NOT hoisted
// Classes are first-class citizens (can be passed into functions and returned
// from functions - because a class is just a special kind of function behind the scenes)
// Body of a class is executed in strict mode even if we don't activate it in the file
