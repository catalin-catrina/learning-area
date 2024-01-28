const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Arrays are objects, and they get access to special built-in methods (tools)

let arr = ['a', 'b', 'c', 'd', 'e'];

/* Both methods (destructuring and slicing) produce a shallow copy, which means if
we modify a property of an object in the copy, this change will be reflected in 
the original array.
This is because destructuring and slicing don't create a new object, but copy a 
reference to the existing object. Every change done with that reference will be 
reflected in all arrays that has that same reference. */

// SLICE - extracts elements from array without changing the original array
// slice - extract everything from 2nd index
console.log(arr.slice(2)); // c, d, e
// slice from 2 to 4 not including 4
console.log(arr.slice(2, 4)); // c, d
// slice last 2 elements
console.log(arr.slice(-2));
// slice from 1st index until the last 2 indexes
console.log(arr.slice(1, -2));
// create a shallow copy of the array - works like [...arr]
console.log(arr.slice());

// SPLICE - extracts elements from array and changes/mutates the original array
// usually used to delete elements from an array (especially the last), the values
// it returns is rarely useful.
// console.log(arr.splice(2)); // c, d, e
arr.splice(-1); // returns e and deletes it from original array
console.log(arr); // a, b, c, d
// deletes / extracts 2 elements starting with index 1
arr.splice(1, 2);
console.log(arr); // a, d

// REVERSE - reverses and changes / mutates the original array
const arr2 = ['a', 'b', 'c', 'd', 'e'];
console.log(arr2.reverse());

// CONCAT
const arr3 = ['j', 'i', 'h', 'g', 'f'];
const letters = arr2.concat(arr3);
console.log(letters);
console.log([...arr2, ...arr3]); // same as doing this

// JOIN - creates a string from an array, with a specified separator
console.log(letters.join(' - '));
