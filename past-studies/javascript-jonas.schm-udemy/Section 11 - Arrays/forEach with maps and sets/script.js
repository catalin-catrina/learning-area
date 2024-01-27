const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

/* forEach is just a higherOrder function calling a callback function on every iteration */

// forEach with maps
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// forEach with sets
// sets don't have a key or index, in the forEach method the second parameter passed
// into the callback function is the same as the first, they both represent
// the value of the current iteration, so we use _ as a throwaway variable
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}`);
});
