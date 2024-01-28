// Creating an object is very similar to creating an array
const catalinArray = [
  'Catalin',
  'Catrina',
  2037 - 1994,
  'JavaScript Developer',
  ['Adi', 'Ionut', 'Andrei'],
];

// Creating an object
const catalinObject = {
  firstName: 'Catalin',
  lastName: 'Catrina',
  age: 2037 - 1994,
  job: 'JavaScript Developer',
  friends: ['Adi', 'Ionut', 'Andrei'],
};

// Accessing properties
console.log(catalinObject.lastName);
console.log(catalinObject['lastName']);

// Example of what we can do with accessing properties of objects
const nameKey = 'Name';
console.log(catalinObject['first' + nameKey]);
console.log(catalinObject['last' + nameKey]);

// Small exercise: prompt user to pick a property and print it to console
// The prompt method displays a dialog box that prompts the visitor for input
/*
const interestedIn = prompt(
  "What do you want to know about Catalin? Choose between firstName, lastName, age, job and friends"
);

if (catalinObject[interestedIn]) {
  console.log(catalinObject[interestedIn]);
} else {
  console.log(
    "Wrong request! Choose between firstName, lastName, age, job and friends"
  );
}
*/

// Adding a new property
catalinObject.location = 'Romania';
catalinObject['movingTo'] = 'Spain';

// Small challenge: write dynamically "Catalin has 3 friends, and his best friend is called Ionut"

console.log(
  catalinObject.firstName +
    ' has ' +
    catalinObject.friends.length +
    ' friends, and his best friend is called ' +
    catalinObject.friends[1]
);

const myself = {
  firstName: 'Catalin',
  lastName: 'Catrina',
  birthYear: 1994,
  job: 'JavaScript Developer',
  friends: ['Adi', 'Ionut', 'Andrei'],
  hasDriversLicense: true,

  /* 1
  calcAge: function (birthYear) {
    return 2037 - birthYear;
  },
  */

  /* 2
  calcAge: function () {
    return 2037 - this.birthYear;
  },
  */

  // 3. we can do this even better by instead of calculating the age in the method everytime, we just do it once and store it as a property in the object
  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },

  // challenge
  getSummary: function () {
    this.summary = `My name is ${this.firstName} ${
      this.lastName
    }, I was born in ${this.birthYear} and I am a ${this.job}. My friends are ${
      this.friends[0]
    }, ${this.friends[1]} and ${this.friends[2]}. I have ${
      this.hasDriversLicense ? 'a' : 'no'
    } drivers license`;
    return this.summary;
  },
};

// The 'this' keyword / 'this' veriable, is basically equal to the object on which the method is called. It is equal to the object calling the method. In our case, "this" is equal to the "myself" object

/* 1 
console.log(myself.calcAge(1994));
console.log(myself["calcAge"](1994));
 */

/* 2
console.log(myself.calcAge());
*/

// now we only call the method once, then we can just console log the age property
console.log(myself.calcAge());
console.log(myself.age);

// challenge
myself.getSummary();
console.log(myself.summary);

// BIG CHALLENGE NUMBER 3
const mark = {
  name: 'Mark Miller',
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

const john = {
  name: 'John Smith',
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

mark.calcBMI();
john.calcBMI();

console.log(
  `${mark.name}'s BMI (${mark.bmi}) is ${
    mark.bmi > john.bmi ? 'higher' : 'lower'
  } than ${john.name}'s (${john.bmi})`
);
