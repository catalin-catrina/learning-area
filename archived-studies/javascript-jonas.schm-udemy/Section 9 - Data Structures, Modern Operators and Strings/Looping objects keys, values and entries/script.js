'use strict';

const openingHours = {
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
};

const restaurant = {
  restaurantName: 'Classico Italiano',
  location: 'Via angelo Tavantiti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours,

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

// Looping properties
for (const key of Object.keys(openingHours)) {
  console.log(key);
}

// Looping values
for (const value of Object.values(openingHours)) {
  console.log(value);
}

// Looping properties + values - Object.entries returns an array of key-value pairs
for (const elem of Object.entries(openingHours)) {
  console.log(elem);
}

// Destructuring the array of key-value pairs
for (const [key, value] of Object.entries(openingHours)) {
  console.log(key, value);
}

// We know the second elem of the array (the value) is an object so we also destructure it
for (const [key, { open: value1, close: value2 }] of Object.entries(
  openingHours
)) {
  console.log(`On ${key} we open at ${value1} and close at ${value2}`);
}
