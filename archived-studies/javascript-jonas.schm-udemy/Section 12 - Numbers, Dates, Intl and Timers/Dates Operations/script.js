'use strict';

// Converting a date to a timestamp (number / ms passed after universal unix time )
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));

// Performing math operations with dates automatically converts them to timestamps (ms),
// so we divide by 1000 to convert to s * 60 to conv to mins * 60 to h * 24 to days
const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);
