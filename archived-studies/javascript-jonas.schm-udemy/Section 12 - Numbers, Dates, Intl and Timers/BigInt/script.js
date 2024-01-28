'use strict';

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// We can represent these larger than MAX_SAFE_INTEGER numbers in JS now
// we either add "n" at the end or we use the BigInt constructor function
// BigInt() is not as accurate as the "n" way of representing a BigInt number
console.log(2340983409832890438092389043089);
console.log(2340983409832890438092389043089n);
console.log(BigInt(2340983409832890438092389043089));

// BigInt() is used to transform a regular number to a big int so we can perform oper
// cannot perform operations between regular numbers and big ints
console.log(400n + 3200n); // 3600
console.log(1239328n * 130n); // 161112640

// console.log(Math.sqrt(16n)); // error

// have to convert num to big int otherwise error
const huge = 23191891089n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions, logical operations and string concatenations are possible
console.log(20n > 15);
console.log(20n === 20); // false because typeof 20n is bigint and typeof20 is number
console.log(20n == 20); // true because == does type coercion

console.log(huge + 'is REALLY big!!!');

// Divisions - returns the closest big int - cuts off the decimal part
console.log(10n / 3n); // 3
