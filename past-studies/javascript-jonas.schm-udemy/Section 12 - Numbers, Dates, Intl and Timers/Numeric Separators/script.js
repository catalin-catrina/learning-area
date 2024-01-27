'use strict';

// 21.543.053.412
const diameter = 21_543_053_412;
console.log(diameter);

// Not === with 345.99, it's just to give meaning to the variable
const priceCents = 345_99;

// Can't place 2 numeric separators in  a row, can't use them at the beginning, can't use
// them near ".", only between numbers, and we can't use them at the end
const PI = 3.1415;

// JS can't parse the underscore here, returns NaN
console.log(Number('230_000')); // NaN
console.log(parseInt('230_000')); // 230
