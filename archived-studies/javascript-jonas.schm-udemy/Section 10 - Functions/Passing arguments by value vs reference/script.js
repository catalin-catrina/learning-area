'use strict';

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 1231243534,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 1231243534) {
    console.log('Check in');
  } else {
    console.log('Wrong passport');
  }
};

checkIn(flight, jonas);

// flight variable doesn't change bc the checkIn function only gets a copy of the variable
// like flightNum = flight;
console.log(flight);

// this worked because when we pass a reference type to a function, what is copied is
// the reference to the object in the memory heap
// like passenger = jonas
// so manipulating the passenger object is the same as manipulating the jonas object
// because they both are the same object in the memory heap
console.log(jonas);

// Passing a primitive to a function is like making a copy outside of the function
// Passing an object to a function is like copying an object: whatever we change in
// the copy, will also happen in the original

// Example exercise
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000000);
};

// Changing the jonas.passport value
newPassport(jonas);

// Calling check in again, this time returning wrong passport because we changed it
checkIn(flight, jonas);

/*
JavaScript DOES NOT have pass by reference, only pass by VALUE
When dealing with objects, with pass in a reference (the memory address of the object),
but that reference itself is still a value, just a value that contains a memory
address
We pass A reference, but we do NOT pass BY reference
*/
