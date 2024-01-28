'use strict';

// Defining a reference variable to an object literal
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // We define a method which acts as a constructor function
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Create a reference (StudentProto) to an empty object that will have PersonProto
// as its prototype
const StudentProto = Object.create(PersonProto);

// Define a method inside the StudentProto object which takes firstName, birthYear, course
// as its parameters, then calls PersonProto.init with the this variable set to StudentProto
// and the the only thing left to define is the course parameter
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// Create another reference to an empty object that will have StudentProto as its prototype
const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

console.log(jay);
console.log(Object.getPrototypeOf(jay)); // StudentProto
console.log(Object.getPrototypeOf(StudentProto)); // PersonProto
console.log(Object.getPrototypeOf(PersonProto)); // Object.prototype
