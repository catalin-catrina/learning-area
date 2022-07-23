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

// Can also populate a new map as an array of arrays
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);

console.log(question);

// Convert object to map
// It's easy because Object.entries() also returns an object in key-value pairs
const openingHoursMap = new Map(Object.entries(restaurant.openingHours));
console.log(openingHoursMap);
console.log(Object.entries(restaurant.openingHours));

// Quizz example app

// Print question
console.log(question.get('question'));

// Print possible answers
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// Get answer from user
const answer = Number(prompt('Your answer'));

// classic way
// if (answer === question.get('correct')) console.log(question.get(true));
// else console.log(question.get(false));

/** 
shorter way: question.get('correct') === answer will return true or false 
that will get us question.get(true/false) both being keys of the question map
print that to console
*/
console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);

/* 
map.entries(), map.keys(), and map.values return the entries, keys and values
in a "MapIterator", so we have to deconstruct (...) each of them
console.log(question.entries());
console.log(question.keys());
console.log(question.values());
*/
console.log(...question.entries());
console.log(...question.keys());
console.log(...question.values());
