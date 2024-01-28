'use strict';

// A set is a collection of unique values, a set can never have any duplicates

// A set has to contain an iterable (array or string), usually an array

// The order does not matter in a set

// The main use case of sets is to remove duplicates from arrays

const set1 = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza']);

const set2 = new Set('Catalin');

const set3 = new Set();

console.log(set1);
console.log(set2);
console.log(set3);

// Size of a set - it's <size> not <length>, like in arrays
console.log(set1.size);

// Check if a value is in a set
console.log(set1.has('Broccoli'));

// Add a value into the set
set1.add('Lasagna');

// Delete a value into the set
set1.delete('Pizza');

// Delete all values from a set
set2.clear();

// Iterate over a set
for (const i of set1) console.log(i);

// Example - remove duplicates from array
let staffArray = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
let seasonsArray = ['winter', 'spring', 'summer', 'spring', 'autumn'];

// shorter version - deconstructing the set into an array 'in place'
let staffSet = [...new Set(staffArray)];

// longer version
let seasonsSet = new Set(seasonsArray);
seasonsArray = [...seasonsSet];

// Example - find size of unique values in an array
console.log(new Set(staffArray).size);

// Example - find size of unique values in string
console.log(new Set('catalinleo').size);
