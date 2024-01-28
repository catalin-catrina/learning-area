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

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*
Spread operator splits array or object for separate elements. "..." is a spread 
operator when is on the right side of "=" and when is passed as an argument to a 
function or method.
We use the SPREAD operator when we would write VALUES separated by commas

Rest operator, in opposite,  unites separated elements to one array.  "..." is a 
rest operator, when is on left side of "=" or when function receive it as a parameter
We use the REST operator when we would write VARIABLES separated by commas
*/

// 1. REST operator with DESTRUCTURING
/*
- The spread (...) operator is used to unpack an array
- The rest (...) operator is used to pack elements into an array
*/

// SPREAD operator, because it's on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST operator, because it's on LEFT side of =
// a = 1, b = 2
// the REST operator collects the elements that are unused in the destructuring
// assignment
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

// The REST operator must always be the last and does not include skipped elements
// in this case 'pasta' is skipped
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);
console.log(sat === restaurant.openingHours.sat);

// 2. REST operator with FUNCTIONS
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  console.log(sum);
};
add(2, 3);
add(5, 3, 6, 7);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
