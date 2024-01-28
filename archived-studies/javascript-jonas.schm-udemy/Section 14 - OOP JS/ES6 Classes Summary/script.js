'use strict';

// parent class
class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

// inheritance between classes, automatically sets prototype
// child class
class Student extends Person {
  // public field, similar to property, available on created object
  university = 'University of Lisbon';

  // private fields, not accessible outside of class
  #studyHours = 0;
  #course;

  // static public field, available only on class
  static numSubjects = 10;

  // constructor method, called by new operator, mandatory in regular class, might be ommited
  // in a child class that has the exact same properties as the parent class
  constructor(fullName, birthYear, startYear, course) {
    // call to parent/super class, necessary with extend, needs to hapen before accessing
    // this keyword
    super(fullName, birthYear);

    // instance property, available on created object, difference from public fields is
    // that instance properties are set based on input data from the constructor, while
    // public fields values are the same across all created objects.
    this.startYear = startYear;

    // redefining private field, this private field should be unique for each student,
    // so we create the private field first without any value, and then we simply redefine
    // it based on the value/input that's coming into the constructor
    this.#course = course;
  }

  // public method
  introduce() {
    console.log(`I study ${this.#course} at ${this.university}`);
  }

  // referencing private field and method
  study(h) {
    this.#makeCoffee();
    this.#studyHours += h;
  }

  // private method
  #makeCoffee() {
    return 'Here is a cafe for you ☕';
  }

  // getter method - get a value out of an object by simply writing a property instead
  // of writing a method (Student.testScore instead of Student.testScore())
  get testScore() {
    return this._testScore;
  }

  // setter method - define the testScore by setting it to some value instead of calling
  // a testScore method
  // to set a property that is already defined in the constructor, then you need to basically
  // create a new property with the _ in front of it (convention), and then in the getter
  // with the same name you then need to return that new property
  set testScore(score) {
    this._testScore = score < 20 ? score : 0;
  }

  // static method, available only on the class, cannot access instance properties nor
  // methods, only static ones (can access numSubjects because its static)
  // static methods are usually used as helper methods for the class
  static printCurriculum() {
    console.log(`There are ${this.numSubjects} subjects`);
  }
}

// create a new object with new operator
const jonas = new Student('Jonas', 2020, 2037, 'Medicine');
