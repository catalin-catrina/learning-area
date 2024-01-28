'use strict';

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name: name,
    });
  },
};

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

// We store the lufthansa.book method in a regular function
const book = lufthansa.book;

// call method
book.call(eurowings, 23, 'Sarah Williams');
book.call(swiss, 583, 'Marry Cooper');
const data = [213, 'Marry Jane'];
book.call(eurowings, ...data);

// apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);

// bind method - also manually sets the this keyword to a value of choice
// difference is that bind doesn't immediately call the function, instead it
// returns a new function where the this keyword is bound
const bookEurowings = book.bind(eurowings);
bookEurowings(23, 'Steven Williams');

const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

// We can also hardcode one or more parameters using the bind method
// Also called partial application - parts of the original functions are already set
const bookEW23 = book.bind(lufthansa, 43);
bookEW23('Ryan Joe');

// Bind method with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

// doesn't work because the "this" keyword here is the .buy element, which is NaN
// In an event handler (event listener) the this keyword always points to the element
// to which that event listener is attached
// returns Not A Number because it's trying to add 1 to the ".buy" element
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// We need to manually set the this keyword to lufthansa object
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
// Set the rate using the bind method - hardcode it so that when we call the
// addVAT function we only need to specify the value
// the first parameter to bind is the the object to which we attach the this
// keyword to, but when we don't care it's common practice to set it to null
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(323));

// Same thing with function returning another function
// The first function takes the rate as a parameter, so that we can call the second
// with only the value we want and skip the rate
const tax = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const vat = tax(0.23);
console.log(vat(323));
console.log(tax(0.23)(323));
