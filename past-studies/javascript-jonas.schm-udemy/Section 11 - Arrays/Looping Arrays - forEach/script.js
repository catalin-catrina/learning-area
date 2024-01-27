const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/* forEach is just a higherOrder function calling a callback function on every iteration */

// for of loop without index
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

// forEach method without index
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

// for of loop with index and destructuring - standard
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${movement}`);
  }
}

// same as doing this - for of loop with index without destructuring
for (const movement of movements.entries()) {
  if (movement[1] > 0) {
    console.log(`Movement ${movement[0]}: You deposited ${movement[1]}`);
  } else {
    console.log(`Movement ${movement[0]}: You withdrew ${movement[1]}`);
  }
}

// forEach method with index
// forEach function can take in current value, current index, and the entire arr
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(arr);
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(arr);
    console.log(`Movement ${i + 1}: You withdrew ${movement}`);
  }
});
