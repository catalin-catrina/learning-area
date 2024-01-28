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

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// We store the lufthansa.book method in a regular function
const book = lufthansa.book;

// in regular functions, the "this" keyword points to undefined (in strict mode)
// so this doesn't work
// book(23, 'Sarah Wiliams');

// There are 3 function methods to tell a function what the "this" keyword is,
// call, apply, bind
// A function is just an object, and objects have methods, therefore functions can
// have methods too

// The call method calls the book function with this = eurowings object
// call method allows us to manually set the this keyword of any function we call
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Marry Cooper');
console.log(swiss);

// apply method
// does the same thing as the call method, but takes an array that it passess
// to the function as parameters by itself
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// Or we can use call method like this by spreading the arguments from an array
book.call(eurowings, ...flightData);
