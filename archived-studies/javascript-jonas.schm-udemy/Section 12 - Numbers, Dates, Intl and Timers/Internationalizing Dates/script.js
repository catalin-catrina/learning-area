'use strict';

// Read the documentation:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

// Below are just a few exaamples

// Using the Internationalization API
// Intl is the namespace for the internationalization API
// for times and dates we use .DateTimeFormat() function, which takes a 'local'
// string as an argument, which is language/country

const now = new Date();

document.querySelector('.date-enUS').textContent = new Intl.DateTimeFormat(
  'en-US'
).format(now);

document.querySelector('.date-enGB').textContent = new Intl.DateTimeFormat(
  'en-GB'
).format(now);

document.querySelector('.date-roRO').textContent = new Intl.DateTimeFormat(
  'ro-RO'
).format(now);

// We can also add an object as a second parameter to DateTimeFormat()
// If we specify an object as a 2nd parameter and we only give it the hour and minute
// properties, the date doesn't show
const options = {
  hour: 'numeric',
  minute: 'numeric',
};
document.querySelector('.date1').textContent = new Intl.DateTimeFormat(
  'en-GB',
  options
).format(now);

// if we specify the day as a property in the object passed as a second parameter,
// only the day shows
const options2 = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
};
document.querySelector('.date2').textContent = new Intl.DateTimeFormat(
  'en-GB',
  options2
).format(now);

// the month property can take the values numeric, long, and 2-digit
const options3 = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
};
document.querySelector('.date3').textContent = new Intl.DateTimeFormat(
  'en-GB',
  options3
).format(now);

const options4 = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
};
document.querySelector('.date4').textContent = new Intl.DateTimeFormat(
  'en-GB',
  options4
).format(now);

// year can be numeric and 2-digit; we can also specify the weekday which can be long,
// short or narrow
const options5 = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: '2-digit',
  year: 'numeric',
  weekday: 'long',
};
document.querySelector('.date5').textContent = new Intl.DateTimeFormat(
  'en-GB',
  options5
).format(now);

// get the locale parameter from the user's browser instead of hardcoding it
const locale = navigator.language;
console.log(locale);
