'use strict';

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker); // the Scopes property of booker is the variable environment of
// the booker function

/* 
a closure makes a function remember all the variables that existed at the 
function's birthplace
in our case secureBooking is the "birthplace" of the booker function

Any function always has access to the variable environment of the execution context
in which the function was created

booker was created in the execution context of secureBooking
therefore the booker function will get access to the secureBooking variable environment,
which contains the passengerCount variable
so this is how the booker function will be able to read and manipulate the passengerCount
variable.
it's this connection that we call closure.

Closure: the variable environment attached to the function, exactly as it was at the time 
and place the function was created

Less formal definition: a closure gives a function access to all the variables of its
parent function, even after that parent function has returned. The function keeps a 
reference to its outer scope, which preserves the scope chain throughout time

the closure has priority over the scope chain
*/

// Examples of closure
const h = function () {
  const a = 23;
  return function () {
    console.log(a * 2);
  };
};

h()();

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f();
console.dir(f); // closure contains a = 23;

const k = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

// Reassigning the f variable to the function inside k()
k();
f();
console.dir(f); // closure contains b = 777;

// Another example
/* boardPassengers will create the perGroup variable, will run setTimeout, which will
wait 3 seconds to execute, then will print the last console.log without waiting for
the setTimeout function to finish execution. So by the time the setTimeout function
is running, boardPassengers has long finished execution, and the only way it still
has access to the n parameter and the perGroup variable is because a closure
was created. */
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  // Execute a function after x ms (1000 ms = 1 s)
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

/* if the scope chain had priority over the closure, the setTimeout function would
use the perGroup variable in the global scope below, but it will only use it if
we comment out the perGroup variable in the boardPassengers so that a closure
doesn't happen */
const perGroup = 1000;

boardPassengers(180, 3);
