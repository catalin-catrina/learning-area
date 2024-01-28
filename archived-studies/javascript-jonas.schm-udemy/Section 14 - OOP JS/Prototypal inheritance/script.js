'use strict';

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

Person.prototype.species = 'Homo Sapiens';

const jonas = new Person('jonas', 1990);

// Old/deprecated way of accessing an object's prototype
console.log(jonas.__proto__); // Person.prototype

// Modern way
console.log(Object.getPrototypeOf(jonas)); // Person.prototype

console.log(jonas.__proto__ === Object.getPrototypeOf(jonas)); // true

console.log(Object.getPrototypeOf(Object.getPrototypeOf(jonas))); // Object.prototype

// Object.prototype's prototype is null - top of the chain
console.log(Object.getPrototypeOf(Object.prototype)); // null

// Person.prototype.constructor is a reference back to the Person function
console.dir(Person.prototype.constructor);
