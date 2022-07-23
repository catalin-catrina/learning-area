'use strict';

/*

The this keyword / variable: Special variable that is created for every execution 
context (every function). 
Takes the value of (points to) the 'owner' of the function in which the this 
keyword is used

this is NOT static. It depends on how the function is called, and its value is 
only assigned when the function is actually called

this does NOT point to the function itself, and also NOT the its variable environment!

*/

// For methods - this = Object that is calling the method.
const jonas = {
  name: 'Jonas',
  year: 1989,
  calcAge: function () {
    console.log(this);
    console.log('Age is', 2037 - this.year);
  },
};

jonas.calcAge();

const matilda = {
  year: 2017,
};

// Copying the calcAge method from the jonas object to matilda
matilda.calcAge = jonas.calcAge;
matilda.calcAge();

const f = jonas.calcAge;
f(); // This keyword returns undefined now because f is just a regular function,
// and it doesn't have an object parent

// Simple function call - this = undefined; If strict mode is off, 'this' will
// refer to the global object in the browser: window
const calculateAge = function (birthYear) {
  console.log(this + ' - in a regular function call'); // in a regular function
  // call, the this keyword will point to undefined
};
calculateAge(1994);

// Global scope - this = window object; The this keyword in the global scope is
// the window object
console.log(this + ' - in the global scope');

/* Arrow functions don't get their own this keyword - this = this of surrounding
  function (lexical this)
  lexical 'this' keyword = uses the this keyword of its parent scope, in this case
  the window object
  */
const calcAgeArrow = (birthYear) => {
  console.log(this + ' - in an arrow function');
};
calcAgeArrow(2021);

// Event listener - this = DOM element that the handler is attached to
