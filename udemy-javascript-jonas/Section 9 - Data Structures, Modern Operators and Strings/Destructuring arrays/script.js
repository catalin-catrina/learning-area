'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via angelo Tavantiti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

/*
- Array/Object destructuring is an ES6 feature and is a way of unpacking values from arrays
or objects into separate variables.
*/

// Array destructuring
const arr = [2, 3, 4];
const [a, b, c] = arr;
console.log(a, b, c);

// Destructuring only the first 2 elements of the array
const [catOne, catTwo] = restaurant.categories;

// Destructuring the 1st and 3rd element of the array
const [catThree, , catFour] = restaurant.categories;

// Destructuring the 2nd and 4th element of the array and reverse them
let [, catFive, , catSixth] = restaurant.categories;
[catFive, catSixth] = [catSixth, catFive];

// Destructuring an array returned from a function / method
const [starter, main] = restaurant.order(2, 0);

// Destructuring a nested array
const nested = [2, 4, [5, 6, 7]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [m = 1, n = 1, p = 1] = [5, 7];
