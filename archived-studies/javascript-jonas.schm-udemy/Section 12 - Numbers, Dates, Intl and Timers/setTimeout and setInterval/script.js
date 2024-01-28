'use strict';

// setTimeout timer runs just once after a defined time
// we use setTimeout to execute some code at some point in the future

// setInterval timer keeps running forever until we stop it

// Asynchronous JavaScript
// The main code doesn't stop execution while the setTimeout function is waiting for
// its callback to execute

const ingredients = ['olives', 'spinach'];

setTimeout(() => console.log('Here is your pizza 🍕'), 3000);

console.log('Waiting...');

// since we're not calling the callback to the setTimeout function ourselves, we can't
// pass arguments like we usually do, when we use setTimeout function we pass the
// parameters to the callback after the timer in ms
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Pizza with ${ing1} and ${ing2} coming in ...`),
  5000,
  [...ingredients]
);

// Canceling a setTimeout timer
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
// Creating a clock solution 1
setInterval(
  () =>
    console.log(
      new Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date())
    ),
  1000
);

// Creating a clock solution 2
setInterval(function () {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  console.log(`${hours}:${minutes}:${seconds}`);
}, 5000);

// Creating a clock solution 3
setInterval(
  () =>
    console.log(
      new Intl.DateTimeFormat(navigator.language, {
        timeStyle: 'medium',
      }).format(new Date())
    ),
  1000
);
