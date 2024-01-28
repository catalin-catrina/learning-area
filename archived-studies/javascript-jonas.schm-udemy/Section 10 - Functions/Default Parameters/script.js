'use strict';

const bookingsArray = [];
const bookingsArrayES6 = [];

const createBooking = function (flightNum, numPassengers, price) {
  // Setting default values of function parameters before ES6
  numPassengers = numPassengers || 1;

  /* Before ES6 we had to specify if we wanted a property inside the object to get
  the value of a function parameter */
  const booking = {
    flightNum: flightNum,
    numPassengers: numPassengers,
    price: price,
  };
  console.log(booking);

  bookingsArray.push(booking);
};

createBooking('LH123');
createBooking('LH154', 2, 1000);

// Doing the same in ES6
// Can specify default parameters straight when defining the parameters
// Can define a parameter's default value with the help of parameters that came before
const createBookingES6 = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);

  bookingsArrayES6.push(booking);
};

createBookingES6('SL543');
createBookingES6('QW432', 2, 1000);
createBookingES6('QW432', 2);

// Skip specifying a parameter by assigning it to undefined
createBookingES6('DS1231', undefined, 1000);
