'use strict';

function logger() {
  console.log('My name is Leo');
}

logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const niceJuice = fruitProcessor(3, 4);
console.log(niceJuice);

// function declarations and function expressions do the same thing, it's a matter of preference
// function declaration
function calcAge1(birthYear) {
  return 2037 - birthYear;
}

const age1 = calcAge1(1994);
console.log(age1);

// function expression, it returns a value, also called anonymous function
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

const age2 = calcAge2(1994);
console.log(age1, age2);

// arrow function = another way of writing a function expression
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1994);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(1994, 'Catalin'));

// functions calling other functions
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProc(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}

console.log(fruitProc(2, 3));

// coding challenge 1
const calcAverage = (score1, score2, score3) => {
  let avg = (score1 + score2 + score3) / 3;
  return avg;
};

function checkWinner(avgDolphins, avgKoalas) {
  if (avgDolphins >= avgKoalas * 2) {
    return `Dolphins won ${avgDolphins} to ${avgKoalas} 🏆`;
  } else if (avgKoalas >= avgDolphins * 2) {
    return `Koalas won ${avgKoalas} to ${avgDolphins} 🏆`;
  } else {
    return 'Noone wins!';
  }
}

let dolphScore = calcAverage(85, 54, 41);
let koalaScore = calcAverage(23, 34, 27);

console.log(checkWinner(dolphScore, koalaScore));
// first set: Noone wins
// second set: Dolphins won 60 to 28 - CHALLENGE SUCCESSFULL 🏆🏆😊😊
