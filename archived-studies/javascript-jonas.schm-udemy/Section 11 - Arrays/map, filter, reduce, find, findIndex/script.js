'use strict';

// map iterates over an array using a callback function,
// it maps the value of the original array to a new array
// map returns a new array containing the results of applying an operation on all
// original array elements
// same as forEach, but map() returns an array, forEach() doesn't return anything,
// it's just a looping tool

// filter returns a new array containing the array elements that passed a specific
// test condition

// reduce "reduces" all array elements down to one single value (e.g adding all
// elements together / finding max / min etc)
// it takes an accumulator as parameter to which every element is added
// reduce returns the accumulator value, not an array

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// map()
const euroToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
});

// same thing with arrow function
const movementsUSDArrow = movements.map((mov) => mov * euroToUsd);

// same thing with forEach
let movementsUSDforEach = [];
movements.forEach(function (mov) {
  movementsUSDforEach.push(mov * euroToUsd);
});

console.log(movements);
console.log(movementsUSD);
console.log(movementsUSDforEach);
console.log(movementsUSDArrow);

// Another example with the map() method
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);

// filter()
const deposits = movements.filter((mov) => (mov > 0 ? mov : ''));
console.log(movements);
console.log(deposits);

// also works like this
const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);

// reduce()
// accumulator -> SNOWBALL
// first parameter to reduce() is a callback function, second is the starting value
// of the accumulator, which can also be an array or an object
// if not mentioned, starting value of the accumulator is the first value of the array
// and the first element in the array and iteration will start from second element
const balance = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur;
}, 0);
console.log(balance);

// Maximum value
const max = movements.reduce((acc, val) => {
  return acc > val ? acc : val;
  // no need for this because acc automatically gets the value of the returned value
  // return acc > val ? acc : (acc = val);
});

console.log(max);

// find()
// we use find() to retrieve one element of an array based on a condition
// just like the filter method, find() needs a callback function that returns a boolean
// returns the first element of the array that satisfied a condition
// filter() returns an array of all the elements that satisfy the condition
// find() returns the first value that satisfied the condition
const firstWithdrawal = movements.find(function (mov) {
  return mov < 0;
});

console.log(firstWithdrawal);

// findIndex() - just like find but returns the first index that satisfies a condition
const secondWithdrawal = movements.findIndex(function (mov) {
  return mov > 0;
});

console.log(firstWithdrawal);
