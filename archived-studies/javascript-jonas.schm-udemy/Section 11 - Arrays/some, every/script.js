'use strict';

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// includes only tests for equality
console.log(movements.includes(-130)); // returns true

// some
// returns true if at least one element satisfy the condition
// can also test for equality but also for a condition
console.log(movements.some((mov) => mov === 0)); // returns true
console.log(movements.some((mov) => mov > 5000)); // checks for value > 0 and returns false

// every
// returns true only if all elements satisfy the condition
console.log(movements.some((mov) => mov === 0)); // returns false

// trick: can save the callback function in a separate variable
const deposit = (mov) => mov < 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
