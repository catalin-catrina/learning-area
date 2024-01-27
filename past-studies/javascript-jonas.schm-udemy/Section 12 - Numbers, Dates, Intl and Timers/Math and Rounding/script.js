'use strict';

// Square root
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5

// Cubic root
console.log(8 ** (1 / 3)); // 2

// max() and min()
console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.min(5, 18, 23, 11, 2)); // 2

// these 2 functions do type coercion
console.log(Math.max(5, 18, '23', 11, 2)); // 23
console.log(Math.min(5, 18, '23', 11, 2)); // 2

// but they don't do parsing
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN
console.log(Math.min(5, 18, '23px', 11, 2)); // NaN

// area of a circle with radius = 10px
console.log((Math.PI * Number.parseFloat('10px')) ** 2);

// random number between 0 and 1
console.log(Math.random());

// random number between 0 and 5
console.log(Math.trunc(Math.random() * 6));

// random number between 1 and 6
console.log(Math.trunc(Math.random() * 6 + 1));

// Get a value between min and max
// 0...1 => 0...(max-min) => min...(max - min + min) => min...max
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

// Rounding integers
console.log(Math.trunc(23.6)); // 23 - removes decimal part
console.log(Math.round(23.6)); // 24 - rounds to nearest integer
console.log(Math.ceil(23.4)); // 24 - rounds up
console.log(Math.floor(23.4)); //23 - rounds down

// Math.floor() and Math.trunc() work the same with positive numbers, but not with negative
console.log(Math.floor(-23.2));
console.log(Math.trunc(-23.2));

// toFixed() round number to a specified number of decimals
// JavaScript will transform the primitive (number) to a Number object, where it will call
// toFixed(), then transform it back to a primitive - boxing
// tofixed transforms the number to a string so we have to turn it back to a number
console.log((2.8).toFixed(0)); // 3 - string
console.log((2.8).toFixed(2)); // 2.80 - string
console.log((2.8436).toFixed(3)); // 2.844 - string
console.log(+(2.8436).toFixed(3)); // 2.844 - number
