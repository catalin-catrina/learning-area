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

const arr = [23, 5, 5, 1, 1, 34, 5, 65];

// Array.prototype is the prototype of all arrays
console.log(Object.getPrototypeOf(arr));
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true

// Object.prototype is the prototype of Array.prototype
console.log(Object.getPrototypeOf(Array.prototype));
console.log(Object.getPrototypeOf(Array.prototype) == Object.prototype); // true

// Can add methods on the Array prototype property, which all arrays will inherit
// Remove duplicates by creating a set out of the array, then spread it back into an arr
// Not recommended - just experimentation of what's possible
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// h1's prototype is HTMLHeadingElement -> HTMLElement -> Element -> Node -> EventTarget
// -> Object
const h1 = document.querySelector('h1');
console.log(Object.getPrototypeOf(h1)); // HTMLHeadingElement
console.log(Object.getPrototypeOf(HTMLHeadingElement)); // HTMLElement()

// Functions are just objects, so they have a prototype themselves from which they
// inherit all their methods, like bind, apply, call and so on.
console.dir((x) => x + 1);
console.log(Object.getPrototypeOf((x) => x + 1)); // f() [native code]
