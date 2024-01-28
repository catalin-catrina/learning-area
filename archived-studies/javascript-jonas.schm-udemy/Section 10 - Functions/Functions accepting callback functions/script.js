'use strict';

/* Higher order and callback functions are an important feature of JS because they
not only allow to nicely refactor our program into functions, but also allows for
good abstraction techniques: higher order functions hide complexity in call back
functions*/

const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  // splitting the input by spaces and destructuring into a variable that holds the
  // first word, and an array that holds the rest
  const [first, ...others] = str.split(' ');

  // return an array with the first word to uppercase and the others array then join
  // it by space
  return [first.toUpperCase(), ...others].join(' ');
};

console.log(oneWord('hi there')); // returns hithere
console.log(upperFirstWord('hi there')); // returns HI there

// Higher-order function because it takes another function as a parameter
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  // .name is a property all functions have and returns their name
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

const high5 = function () {
  console.log('👏');
};

// Another example of higher-order function: addEventListener is the higher-order,
// high5 is the callback function
document.body.addEventListener('click', high5);

// call high5 for each element of the array, so 3 times
['Jonas', 'Martha', 'Adam'].forEach(high5);
