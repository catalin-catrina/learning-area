'use strict';

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static methods
  static hey() {
    console.log('Hey there 🙋‍♀️');
  }
}

// super is the constructor function of the parent class
// calling the super function always needs to happen first because this call to the
// super function is responsible for creating the this keyword for this subclass
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // This method in the child class will overwrite the calcAge it inherited from parent
  // because it appears first in the prototype chain
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${this.birthYear + 10}`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
console.log(martha);
martha.introduce();
martha.calcAge();

// If we don't have any additional properties for the child class, we can just
// write it like this, without mentioning the constructor {} at all
class DeveloperCl extends PersonCl {}
const leo = new DeveloperCl('Catalin Catrina', 1994, 'CS');
console.log(leo);
