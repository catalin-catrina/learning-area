'use strict';

/*
Even though strings are primitives, JS is smart and converts the string to an object,
and it's that object that gives us access to all the methods we used below.
All the object's methods return regular strings 
*/

// What happens behind the scenes - turning a string into an object
// It's then this object that gives us access to all the 'string' methods
console.log(new String('jonas'));

// object
console.log(typeof new String('jonas'));

// but when we call a method on it, returns back a string
console.log(typeof new String('jonas').slice(0, 3));

// Anyway, let's continue with explaining all the string methods
const airline = 'TAP Air Portugal';
const plane = 'A320';

// Length of string
console.log(airline.length);

// Index of first and last occurrence of a char
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));

// Index of a sequence of chars - returns -1 if not found
console.log(airline.indexOf('Portugal'));

// Slice / extract substring starting from position 4 - returns 'Air Portugal'
console.log(airline.slice(4));

// Slice from pos 4 to pos 7 (not including 7)
console.log(airline.slice(4, 7));

// Slice from 0 to first space - get first word
console.log(airline.slice(0, airline.indexOf(' ')));

// Slice from first space (+1 - to not include space) until the end - get last word
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// Slice first two chars from the end
console.log(airline.slice(-2));

// Slice from pos 1 until first char from the end
console.log(airline.slice(1, -1));

// Example - check if last letter is B or E (middle seat)
const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat ');
  else console.log('You got lucky');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// Convert string to lowercase
console.log(airline.toLowerCase());

// Convert string to uppercase
console.log(airline.toUpperCase());

// Remove spaces new lines (\n) from beginning and end
console.log('jonas\n\n'.trim());
console.log(' jonas'.trimStart());
console.log('jonas '.trimEnd());

// Replacing strings and characters
// Replace only replaces the first occurrence of the character / string
const priceEU = '288,97€';
const priceUS = priceEU.replace('€', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replaceAll('door', 'gate'));

// Return booleans
// Check if a string contains / includes a substring
const planeName = 'A320neo';
console.log(planeName.includes('A320'));

// Check if a string starts with a substring
console.log(plane.startsWith('Air'));

// Check if a string ends with a substring
console.log(planeName.endsWith('o'));

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun'))
    console.log('You are NOT allowed on board');
  else console.log('Welcome aboard');
};

checkBaggage('I have a laptop, some Food, and a Pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// Split - splitting string into array with delimiter
console.log('a+very+nice+string'.split('+'));
console.log('jonas schmedtmann'.split(' '));

// Combining destructuring with splitting a string
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

// Join - apply on an array with a specified delimited to create a string
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

// Practice exercise - capitalize the first letter of every word in string
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // both ways work
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');

// Padding a string - adding a number of chars until the string has a certain length
const message = 'Go to gate 23!';

// Add "+" signs at the beginning until the string is 25 chars long
// Then add more "+" signs at the end until the string is 30 chars long
console.log(message.padStart(25, '+').padEnd(30, '+'));

console.log('Jonas'.padStart(25, '+'));
console.log('Jonas'.padEnd(25, '+'));

// Practice exercise - mask credit card number
const maskCreditCard = function (number) {
  // Typical way of converting a number to a string
  // const str = String(number);

  // Another / easier way, when one of the operands of the + sign is a string,
  // it converts everything to a string
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(219837139783198));
console.log(maskCreditCard('12381972391781879'));

// Repeat - repeat the same string multiple times
const message2 = 'Bad weather... All Departures Delayed ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};
planesInLine(3);
planesInLine(5);
