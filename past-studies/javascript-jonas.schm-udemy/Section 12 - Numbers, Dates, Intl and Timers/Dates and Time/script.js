'use strict';

// Create a date
const now = new Date();
console.log(now);

// JavaScript can also parse a string to a date - not really recommended
const now2 = new Date('Aug 02 2022');
const now3 = new Date('2023 09');

console.log(now2);
console.log(now3);

const now4 = new Date(2037, 10, 19, 15, 23, 5);
console.log(now4);

// Date constructor function also takes a single number in ms as a parameter
console.log(new Date(0)); // 0 milliseconds after Universal Unix Time - Jan 01 1970
// 3 days * 60 hours * 60 seconds * 1000ms
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after UTC

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);

console.log(future);
console.log(future.getFullYear()); // never use getYear()
console.log(future.getMonth()); // 10 is month number 11
console.log(future.getDate()); // this gets the day
console.log(future.getDay()); // this gets the day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

// convert a date object into a string to then store somewhere
console.log(future.toISOString()); // international standard

// timestamp for the date
console.log(future.getTime()); // how many ms passed since Jan 1st 1970
console.log(new Date(2142249780000));

// timestamp for now
console.log(Date.now());

// Set versions of all the methods above
future.setFullYear(2040);
console.log(future);
