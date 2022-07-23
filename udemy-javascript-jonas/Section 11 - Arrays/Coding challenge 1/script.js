'use strict';

const checkDog = function (dogsJulia, dogsKate) {
  const correctJulia = dogsJulia.slice(1, -2);
  //   const totalDogs = correctJulia.concat(dogsKate);
  const totalDogs = [...correctJulia, ...dogsKate];
  totalDogs.forEach(function (val, i) {
    val >= 3
      ? console.log(`Dog number ${i + 1} is an adult and is ${val} years old`)
      : console.log(`Dog number ${i + 1} is still a puppy`);
  });
};

checkDog([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
