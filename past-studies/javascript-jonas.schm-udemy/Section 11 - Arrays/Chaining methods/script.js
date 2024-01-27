'use strict';

const movements = [125, -300, 2000, 144, 894, -1053];

// a nice debugging tool when chaining methods like this is using the array parameter
// in the next method of the one we think is causing the problem, or we can even check the
// array we're working with at every step of the way
// for example, if we think there's a problem with the first filter, we can log the
// array in the map method that follows, to see what we are working with
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * 1.1;
  })
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

// It's a bad practice to chain methods that mutate the array, like splice() and reverse()
