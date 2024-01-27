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

/* Logical operators use ANY data type, return ANY data type, short-circuiting

||

1. If there is a truthy value, it will return the FIRST TRUTHY VALUE

2. If there is no truthy value, it will return the LAST FALSY VALUE



&&

1. If there is no truthy value, it will return the FIRST FALSY VALUE

2. If there is a truthy value, it will return the LAST TRUTHY VALUE



?? (nullish coalescing operator)

1. Just like ||, but only treat null and undefined(these two so called nullish value) 
as FALSY VALUE. Empty string and 0 are TRUTHY VALUE
*/

console.log('---- OR ----');
// Short-circuiting: if the first value is truthy, the second value is not even checked
console.log(3 || 'Jonas');

// '' is a falsy value => returns 'Jonas'
console.log('' || 'Jonas');

// true is truthy => returns true
console.log(true || 0);

// both are falsy => returns null
console.log(undefined || null);

// returns first truthy value = returns Hello
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// an easier way than using a ternary operator
// restaurant.numGuests is undefined(falsy value) so guests2 = 10
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('----AND----');
// The && operator short-circuits when it meets the first falsy value
console.log(0 && 'Jonas');

// When all values are truthy, the last value is returned
console.log(7 && 'Jonas');

// Returns null because it's the first falsy value
// The evaluation no longer needs to continue because && needs all 'conditions' to be
// truthy
console.log('Hello' && 23 && null && 'Jonas');

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

console.log('----?? NULLISH ----');
// Nullish: null and undefined (NOT 0 or '')
// For the nullish coalescing operator 0 and '' are not falsy values
const guestCorrect = restaurant.numGuests ?? 10;
