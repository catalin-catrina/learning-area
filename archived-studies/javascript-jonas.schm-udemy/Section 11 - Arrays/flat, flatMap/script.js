'use strict';

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Flattening the array - making a multi dim array a 1-dimensional array
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

// flat() by default only flattens 1 level deep, can specify a parameter to control the lvl
const arrDeep = [[1, [2, 3]], [[4, 5], 6], 7, 8];
console.log(arrDeep.flat(2));
