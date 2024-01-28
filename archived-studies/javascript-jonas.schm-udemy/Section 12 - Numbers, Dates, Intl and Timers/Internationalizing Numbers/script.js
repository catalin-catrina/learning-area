'use strict';

// Read the documentation:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

// Below are just a few exaamples

// Using the Internationalization API
// check Internationalization API documentation for more details

// Intl is the namespace for the internationalization API

const num = 8743329.43;

// Basic numbers formatting
console.log('US:', new Intl.NumberFormat('en-US').format(num));
console.log('Germany:', new Intl.NumberFormat('de-DE').format(num));
console.log('Syria:', new Intl.NumberFormat('ar-SY').format(num));
console.log('Browser:', new Intl.NumberFormat(navigator.language).format(num));

// Numbers formatting with using an object as a second parameter that can take specific
// parameters - check Internationalization API documentation for more details
const options = {
  style: 'unit',
  unit: 'mile-per-hour',
};
console.log(
  'With 2nd parameter: ',
  new Intl.NumberFormat('en-US', options).format(num)
);

// If we set the style property to percent, the unit property is ignored
const options2 = {
  style: 'percent',
  unit: 'mile-per-hour',
};
console.log(
  'With style: percent the unit property is ignored: ',
  new Intl.NumberFormat('en-US', options2).format(num)
);

// If we set the style property to currency, the unit property is ignored, and we have
// to set a currency property
const options3 = {
  style: 'currency',
  unit: 'mile-per-hour',
  currency: 'EUR',
};
console.log(
  'With style: currency the unit property is also ignored: ',
  new Intl.NumberFormat('en-US', options3).format(num)
);

// useGrouping: false cuts off all the dots or commas between numbers
const options4 = {
  style: 'currency',
  unit: 'mile-per-hour',
  currency: 'EUR',
  useGrouping: false,
};
console.log(
  'With useGrouping set as false: ',
  new Intl.NumberFormat('en-US', options4).format(num)
);

const options5 = {
  style: 'currency',
  unit: 'mile-per-hour',
  currency: 'EUR',
  useGrouping: true,
};
console.log(
  'With useGrouping set as true: ',
  new Intl.NumberFormat('en-US', options5).format(num)
);
