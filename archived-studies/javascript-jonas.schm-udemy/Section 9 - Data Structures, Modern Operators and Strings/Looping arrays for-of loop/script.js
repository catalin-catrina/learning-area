'use strict';

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

// Creating a menu array by joining two arrays in the object above
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// Iterating through an array without indices
for (const item of menu) console.log(item);

// Iterating through an array if we need the indices
// entries() is a method on the array object where the 0-index, 2-element
for (const item of menu.entries()) {
  console.log(item[0], item[1]);
}

// Destructure the item array - another way of doing the same thing
for (const [i, el] of menu.entries()) {
  console.log(i, el);
}

console.log(menu.entries());
console.log([...menu.entries()]);
