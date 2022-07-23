'use strict';

function calcAverageHumanAge(ages) {
  const humanAges = ages.map((value) =>
    value <= 2 ? 2 * value : 16 + value * 4
  );

  const filteredHumanAges = humanAges.filter((val) => val >= 18);

  const average =
    filteredHumanAges.reduce((acc, val) => {
      return acc + val;
    }) / humanAges.length;

  return average;
}
console.log(calcAverageHumanAge([3, 5, 2, 12, 7]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

const calcAverageHumanAgeChained = function (arr) {
  const averageHumanAges =
    arr
      .map((value) => (value <= 2 ? 2 * value : 16 + value * 4))
      .filter((val) => val >= 18)
      .reduce((acc, val) => acc + val) / arr.length;
  return averageHumanAges;
};
console.log(calcAverageHumanAgeChained([3, 5, 2, 12, 7]));
console.log(calcAverageHumanAgeChained([16, 6, 10, 5, 6, 1, 4]));
