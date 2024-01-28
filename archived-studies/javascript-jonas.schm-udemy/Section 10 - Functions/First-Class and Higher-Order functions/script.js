'use strict';

/*
FIRST-CLASS FUNCTIONS - is a feature JavaScript has - all functions are values
- JavaScript treats functions as first-class citizens
- This means that funcions are simply values
- Functions are just another "type" of object
*/

// We can store functions in variables or properties
const add = (a, b) => a + b;
const counter = {
  value: 23,
  inc: function () {
    this.value++;
  },
};

// We can pass functions as arguments to OTHER functions:
const greet = () => console.log('Hey Jonas');
btnClose.addEventListener('click', greet);

// We can return functions FROM functions

// We can call methods on functions:
counter.inc.bind(someOtherObject);

/*
HIGHER-ORDER FUNCTIONS
- A function that receives another function as an argument, that returns a 
new function, or both
- This is only possible because of first-class functions
*/

// 1. Function that receives another function
// addEventListener() is the Higher-Order function, greeting() is the callback function
const greeting = () => console.log('Hey Jonas');
btnClose.addEventListener('click', greeting);

// 2. Function that returns a new function
// count() is the Higher-order function, the anonymous function() is the returned function
function count() {
  let counter = 0;
  return function () {
    counter++;
  };
}
