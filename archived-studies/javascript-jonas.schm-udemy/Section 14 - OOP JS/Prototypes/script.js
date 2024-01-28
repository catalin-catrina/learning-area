'use strict';

// SUMMARY
// Objects have an internal property called [[Prototype]] that points to their prototypes.
// Objects inherit properties and methods from their prototypes.
// Almost all objects are descendants of Object.prototype and have access to its properties
// and methods.

// Functions have a property called prototype which holds a reference to an object.
// Any object instances created by a constructor function will inherit the properties of
// the object at FunctionName.prototype.

// A constructor function’s prototype property is a descendant of the object referenced
// by Object.prototype.

// You can think of inheritance as a chain, each object’s prototype references the next link
// in the chain until it reaches the default object at the top of the chain, Object.prototype

// Constructor functions
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const Animal = function (name, furColor, age) {
  this.name = name;
  this.furColor = furColor;
  this.age = age;
};

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

Animal.prototype.printMeow = function () {
  console.log(`${this.firstName}: Meowww `);
};

// Instantiating two objects
const jonas = new Person('jonas', 1991);
const lisa = new Person('Lisa', 2020);

// In the prototype property of Person there will be all the methods inherited by
// the objects instantiated with the Person constructor function
console.log(Person.prototype);

// The prototype property has a reference back to its constructor function through
// the .constructor property
console.log(Person === Person.prototype.constructor);

// jonas can call calcAge() even though the object doesnt have that method, because
// of prototypal inheritance
jonas.calcAge();

// Person.prototype is not the prototype of Person, it's the prototype property of Person
// which will be the prototype of all the objects created with the Person constr fct

// On any object we can test if it's a prototype of another object
console.log(Person.prototype.isPrototypeOf(jonas)); // true

// We can also set properties on the prototype, not only methods
// jonas doesn't own the property, it just has access to it through the [[Prototype]]
// property, which === the prototype property of Person
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

// hasOwnProperty is itself a property of an object. in this case jonas inherits the
// property method hasOwnProperty from Object.prototype, and can thus access the method
// Object.prototype can be thought as being the grandfather of all objects as almost
// all objects are descendants of Object.prototype, and therefore have access to its
// properties and methods
console.log(jonas.hasOwnProperty('firstName')); // true
console.log(Object.prototype.hasOwnProperty('hasOwnProperty')); // true

// OLDER way of accessing an object's prototype / deprecated
// the prototype of jonas is the prototype property of the constructor function - Person
console.log(jonas.__proto__); // old
console.log(jonas.__proto__ === Person.prototype); // returns true but its old / dprcated

// MODERN
// Objects have an internal prototype called [[Prototype]] that points to their prototypes

// Modern way of accessing an object's prototype
console.log(Object.getPrototypeOf(jonas));

// Setting an object's prototype to null
Object.setPrototypeOf(lisa, null);

// Setting an object's prototype to another object
Object.setPrototypeOf(lisa, Animal.prototype);
lisa.printMeow();

// The object referenced by Person.prototype is a descendant of Object.prototype
// Object.prototype is the prototype of Person.prototype
console.log(Object.getPrototypeOf(Person.prototype));
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
console.log(Object.prototype.isPrototypeOf(Person.prototype)); // true
Object.prototype.test = "I'm a property of Object.prototype";
// The object referenced by Person.prototype can access the 'test' property because
// Object.prototype is the prototype of Person.prototype
console.log(Person.prototype.test); // I'm a property of Object.prototype
// The object referenced by jonas can also access it because it inherits from
// Person.prototype which in turn inherits from Object.prototype.
console.log(jonas.test); // I'm a property of Object.prototype
