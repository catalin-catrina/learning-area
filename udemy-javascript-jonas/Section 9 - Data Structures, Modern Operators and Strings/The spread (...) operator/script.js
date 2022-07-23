'use strict';

const restaurant = {
  restaurantName: 'Classico Italiano',
  location: 'Via angelo Tavantiti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0,
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} 
        will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
};

/*
    - The spread operator (...) is similar to destructuring, because it also helps us
    get elements out of arrays.
    - The big difference is the spread operator takes all the elements from the array
    and it also doesn't create new variables
    - We can only use it in situations where we would otherwise write values separated
    by commas
    - Meaning we can only use the spread operator when building a new array, or when we 
    pass values into a function
*/

// Spreading (unpacking) an array
const arr = [7, 8, 9];
const newArr = [1, 2, ...arr];
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);

/*
// Example:
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];
restaurant.orderPasta(...ingredients);
*/

// Spreading an object
const newRestaurant = { ...restaurant };

// Spreading an object and adding new properties
const newNewRestaurant = { founder: 'Giusseppe', ...restaurant };

// Copying an object (shadow copying = certain (sub-) values are still connected
// to their original variable)
const restaurantCopy = { ...restaurant };
restaurantCopy.restaurantName = 'Mondina Belinni';
console.log(restaurantCopy.restaurantName, restaurant.restaurantName);
