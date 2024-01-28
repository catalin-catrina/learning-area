'use strict';

const jonas = {
  firstName: 'Jonas',
  year: 1991,

  calcAge: function () {
    console.log(this); // returns the jonas object
    console.log(2037 - this.year);

    const self = this; // 'self' or 'that'

    // This keyword in a function that's inside a method acts the same as if it's
    // a regular function. It returns undefined
    const isMillenial = function () {
      console.log(this, "This keyword in a function that's inside a method");
      //   console.log(this.year >= 1981 && this.year <= 1996);

      // Workaround pre ES6: declaring a variable "self" as "this" (in this case
      // the jonas object), and use "self" instead of "this" in the function that's
      // inside a method
      console.log(
        self,
        'Using self, now we can access the object from inside the function'
      );
      console.log(self.year >= 1981 && self.year <= 1996);
    };

    // Modern solution is to use an arrow function, as a function inside a method,
    // because arrow functions don't have their own this keyword, and they borrow
    // from their parent's scope, in this case the method calcAge, which has jonas
    // object as it's this keyword
    const isYoung = () => {
      console.log(this);
      console.log(this.year >= 1981 && self.year <= 1996);
    };

    isMillenial();
    isYoung();
  },

  // Arrow functions don't get their own this keywords, so in this case
  // this = window object
  // Best practice: Do not use arrow functions as methods
  greet: () => {
    console.log(this); // returns the Window object
    console.log(`Hey ${this.firstName}`); // returns Hey undefined
  },
};

jonas.greet();
jonas.calcAge();

/* 
  Function declarations and function expressions also get access to the
  arguments keyword alongside the this keyword, which basically represents the
  arguments of the function call
*/
// arguments keyword
const addExpression = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpression(2, 5);

// It is completely legal to call a function with more parameters than we specified
// in the function expression
addExpression(2, 5, 21, 5, 7);

// Arrow functions don't get the arguments keyword
const addArrow = (a, b) => {
  // console.log(arguments);
  return a + b;
};
addArrow(3, 5, 6);
