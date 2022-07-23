const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const arr = [23, 11, 64];
// Getting first element
console.log(arr[0]);
console.log(arr.at(0));

// Getting last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

// Also works on strings
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
