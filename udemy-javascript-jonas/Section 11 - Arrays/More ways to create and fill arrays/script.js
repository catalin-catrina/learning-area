const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const arr1 = [1, 2, 3];
const arr2 = new Array(1, 2, 3);

// fill()
// Creates an empty an array of length 5
// fill() is the only method we can call on this resulted empty array
const arr3 = new Array(5);
arr3.fill(1);

const arr4 = new Array(7);
// fill with 2s from index 4 till the end
arr4.fill(2, 4);

const arr5 = new Array(7);
// flll with 1s from index 3 to position 6 not included 6
arr5.fill(1, 3, 6);

const arr6 = [1, 2, 3, 4, 5, 6, 6];
// also works on arrays that are not empty / overwrites existing elements
arr6.fill(12, 1, 4);

// from() - used on the array constructor function, not on the array itself
// first parameter = length of the array
// second parameter = callback function of the values that populate the array, we get
// access to the current element and the index / works like map()
const arr7 = Array.from({ length: 7 }, () => 1);
console.log(arr7);

// arr8 = [1, 2, 3, 4, 5 ,6 ,7]
// length: 7, so indexes will be 0-6, and we just return index + 1 in each iteration
// so we return 1 when index 0, 2 when index 1, and we fill the array with 1-7
// we don't need current element so we specify - throwaway variable - as 1st param
const arr8 = Array.from({ length: 7 }, (_, i) => i + 1);

console.log(
  Array.from({ length: 100 }, (curr, i) => Math.trunc(Math.random() * 6 + 1))
);

// Array.from() was introduced in order to create arrays from array-like structures
// iterables like strings, maps, etc
// another array-like structure is querySelectorAll(), which returns a list of nodes,
// but it's not a real array, so it doesn't have most of the array methods like map()
// or reduce(), so we need to convert node list -> array => we use Array.from()
// example in Bankist App
