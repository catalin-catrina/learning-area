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

// old way of checking if a property exists
if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon);

// we get an error without the if statement - can't read property of undefined
// console.log(restaurant.openingHours.mon.open);

// ES6 way - optional chaining (?.) - only checks for open if stuff before it exists
console.log(restaurant.openingHours.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// If we want to use a variable name as a property name of an object we need []
for (let i = 0; i < days.length; i++) {
  console.log(restaurant.openingHours[days[i]]?.open);
}

for (let day of days) {
  let open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} - ${open} `);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does no exist');
console.log(restaurant.command?.(0, 1) ?? 'Method does no exist');

// Arrays
const users = ['Cata', 'Andrei'];
console.log(users?.[0] ?? 'Boss');
