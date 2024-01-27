'use strict';

// The getter is just like any other method that we set on the prototype
// We "call" the getter as if it is a property
// A getter is a way to set a property

// Not mandatory to specify a setter when we have a getter for the same property
// just a getter or just a setter would be enough

const accounts = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(accounts.latest);

accounts.latest = 50;
console.log(accounts.movements);

class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  // getters and setters can be really useful for data validation
  // creating a setter for a property name
  // when we have a setter which is trying to set a property that already exists,
  // then we add an _ underscore as a convention (just a convention, not a JS feature, can
  // just choose a different variable name to avoid that naming conflict)
  // when we do this we are actually creating a new variable, jesica._fullName will
  // overwrite jessica.fullName
  // so we need to create a getter for the fullName property, that will return the
  // _fullName
  // Now even though birthYear and _fullName will be the only 2 properties defined
  // inside the class, but we can also access age and fullName because of the getters
  // we defined
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
}

const jessica = new Person('jessica davis', 1994);
console.log(jessica.age);
