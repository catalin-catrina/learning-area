'use strict';

// Object.create
// there are no prototype properties, no constructor functions involved, and no new operator
// we use Object.create to manually set the prototype of an object to any other object
// that we want

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // this works like a constructor function but it's not, it's just a programatic way
  // to generate objects with Object.create()
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Object.create(PersonProto) will return a new object that is linked to the prototype
// that we passed in (PersonProto)
const steven = Object.create(PersonProto);

steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(Object.getPrototypeOf(steven)); // PersonProto
console.log(Object.getPrototypeOf(steven) === PersonProto); // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
