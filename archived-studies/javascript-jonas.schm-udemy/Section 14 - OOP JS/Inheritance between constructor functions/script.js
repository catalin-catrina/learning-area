'use strict';

// The whole idea of inheritance between "classes" is that child classes can share
// behavior from their parent classes

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
// Object.create returns an empty object, we have to do this before we assign
// any methods to Student.prototype otherwise it will just overwrite them
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jonas = new Person('Jonas', 1991);

const mike = new Student('Mike', 2020, 'Computer science');

mike.introduce();
mike.calcAge();

console.log(Student.prototype.__proto__ === Person.prototype); // true
console.log(Object.getPrototypeOf(Student.prototype) === Person.prototype); // true

// Proving the prototype chain works
console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

// The constructor property of Student.property should point back to Student, but it
// points to Person because we set the prototype property of Student using Object.create
// this makes it so that the constructor property of Student.prototype is Person
// we have to fix it because sometimes its important to rely on this constructor property
console.dir(Student.prototype.constructor); // Person

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // Student
