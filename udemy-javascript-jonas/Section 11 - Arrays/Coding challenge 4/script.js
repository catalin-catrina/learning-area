'use strict';

/*
Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(function (obj) {
  obj.recommendedFood = Math.trunc(obj.weight ** 0.75 * 28);
});
console.log(dogs);

// 2.
dogs.forEach(function (obj) {
  obj.owners.forEach(function (person) {
    if (person === 'Sarah')
      console.log(
        obj.curFood < obj.recommendedFood
          ? 'eating too little'
          : 'eating too much'
      );
  });
});

// 2. alternative solution
const dogSarah = dogs.find((dog) => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
  } food`
);

// 3.
// let ownersEatTooMuch = [];
// let ownersEatTooLittle = [];
// dogs.forEach(function (obj) {
//   if (obj.curFood > obj.recommendedFood)
//     obj.owners.forEach((val) => ownersEatTooMuch.push(val));
// });
//
// dogs.forEach(function (obj) {
//   if (obj.curFood < obj.recommendedFood)
//     obj.owners.forEach((val) => ownersEatTooLittle.push(val));
// });

const ownersEatTooMuch = dogs
  .filter((val) => val.curFood > val.recommendedFood)
  .map((val) => val.owners)
  .flat();

const ownersEatTooLittle = dogs.flatMap((val, i) =>
  val.curFood < val.recommendedFood ? val.owners : null
);
ownersEatTooLittle.forEach(function (val, i) {
  if (val === null) ownersEatTooLittle.splice(i);
});

console.log(ownersEatTooMuch, ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some((val) => val.curFood === val.recommendedFood));

// 6.
const checkEatingOkay = (val) =>
  val.curFood > val.recommendedFood * 0.9 &&
  val.curFood < val.recommendedFood * 1.1;
console.log(dogs.some(checkEatingOkay));

// 7.
const okayFoodDogs = dogs.filter(checkEatingOkay);

// 8.
// need to first slice before sorting or we overwrite the dogs array too
// slice() is often used to copy an array (shallow copy / one level copy)
const sortedRecFood = dogs.slice().sort((obj1, obj2) => {
  return obj1.recommendedFood - obj2.recommendedFood;
});
console.log(sortedRecFood);
