'use strict';

// In JS all numbers are represented internally as floating point numbers (decimals)
console.log(20 === 20.0); // true

// MOST IMPORTANT METHODS HERE are Number.parseFloat to read a number out of a string
// AND Number.isFinite() to check if a value is a number

// Convert string to number
console.log(Number('23'));
console.log(+'23');

// Parse a number from a string
// parseInt() - the string needs to start with a number for it to work, useful for example
// when we get numbers in px from css
// can take 2 parameters, 2nd parameter is the base - 10 by default, should be mentioned
// to avoid some bugs
// these are global functions and can be used without Number. before them
// but it's encouraged in modern JS to mention the Number namespace before hand
console.log(Number.parseInt('30px')); // 30
console.log(Number.parseInt('30px', 10)); // 30

console.log(Number.parseInt('2.5rem')); // 2
console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(parseInt('2.5rem')); // 2
console.log(parseFloat('2.5rem')); // 2.5

// Check if value literally NaN and type Number
// Number.isNaN() only returns true if the argument is of value NaN and type Number
console.log(Number.isNaN(20)); // false
// These all return false
console.log(Number.isNaN(null));
console.log(Number.isNaN(true));
console.log(Number.isNaN(37));
console.log(Number.isNaN('37'));
console.log(Number.isNaN('37.37'));
console.log(Number.isNaN(''));
console.log(Number.isNaN(' '));

console.log(Number.isNaN('asd')); // false because 'asd' is not a number
console.log(Number.isNaN(+'20x')); // true because +'20x' is a number and value is NaN
console.log(Number.isNaN(0 / 0)); // true because 0 / 0 is a number and value is NaN

// These wold have been true with global isNaN() because isNaN() doesn't require the
// argument to be of type Number, it does type coercion
console.log(Number.isNaN('NaN')); // false
console.log(Number.isNaN(undefined)); // false
console.log(Number.isNaN({})); // false
console.log(Number.isNaN('blabla')); // false

// Check if value is a number (integer & floating point numbers)
// isFinite() is maybe the best way of checking if a value is a number
console.log(Number.isFinite(30)); // true
console.log(Number.isFinite('a string')); // false
console.log(Number.isFinite(+'30')); // true

// Check if value is a number (integer)
console.log(Number.isInteger(30)); // true
console.log(Number.isInteger(30.0)); // true
console.log(Number.isInteger(30.5)); // false
console.log(Number.isInteger('asd')); // false
