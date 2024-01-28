'use strict';

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  console.log(this);

  // Never do this, all objects created with this constructor fct would carry on this
  // method with them = bad for peformance
  // we're going to use prototypes and prototypal inheritance for this - next lecture
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
};

// we create a new object instance (new Person('Jonas', 1991) and store a reference to
// that object in the variable jonas)
const jonas = new Person('Jonas', 1991);
console.log(jonas);

jonas.calcAge();

// 1. New empty {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically returns {}

// the this keyword/variable in the Person function = undefined just like in any other
// function, until we call it using the special New keyword, which makes it a
// constructor function
// after we call it with the new keyword, this = whatever name we set for the object
// when we call the function with the new keyword, in this case this = jonas

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person); // true
