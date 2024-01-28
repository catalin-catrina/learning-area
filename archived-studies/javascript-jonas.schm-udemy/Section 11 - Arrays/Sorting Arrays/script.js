'use strict';

// sort() sorts and mutates the original array
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// sort() only sorts arrays as strings, so by default it can't sort numbers
// solution: call sort with a callback function that goes over every 2 values in the
// array, and sorts them
const numbers = [124, -543, 2, 5, -13];

// return < 0 => A, B
// return > 0 => B, A

// sort ascending
numbers.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});

// sort descending
numbers.sort((a, b) => {
  return a < b ? 1 : -1;
});

// sort ascending method 2
numbers.sort((a, b) => a - b);

// sort descending method 2
numbers.sort((a, b) => b - a);
