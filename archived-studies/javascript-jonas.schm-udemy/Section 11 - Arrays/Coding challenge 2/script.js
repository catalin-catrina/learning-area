'use strict';

function calcAverageHumanAge(ages) {
  const humanAges = ages
    .map((value) => (value <= 2 ? 2 * value : 16 + value * 4))
    .filter((val) => val >= 18);

  const average =
    humanAges.reduce((acc, val) => {
      return acc + val;
    }) / humanAges.length;

  return average;
}
console.log(calcAverageHumanAge([3, 5, 2, 12, 7]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
