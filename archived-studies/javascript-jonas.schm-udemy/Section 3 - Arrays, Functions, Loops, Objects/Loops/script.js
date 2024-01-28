/*
for (let rep = 1; rep <= 10; rep++) {
  console.log("Lifting weights repetition " + rep + " ✌");
}
*/

const catalin = [
  'Catalin',
  'Catrina',
  1994,
  'JavaScript developer',
  ['Adrian', 'Johnny', 'Andrei'],
  true,
];

const types = [];

for (let i = 0; i < catalin.length; i++) {
  console.log(catalin[i] + ' - ' + typeof catalin[i]);

  // types[i] = typeof jonas[i];
  types.push(typeof catalin[i]);
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}

console.log(ages);

// Continue and Break
console.log('---ONLY STRINGS---: ');
for (let i = 0; i < catalin.length; i++) {
  if (typeof catalin[i] == 'string') {
    console.log(catalin[i] + ' - ' + typeof catalin[i]);
  } else {
    continue;
  }
}

console.log('---ONLY STRINGS in a different way---: ');
// another way of writing the same thing
for (let i = 0; i < catalin.length; i++) {
  if (typeof catalin[i] != 'string') continue;
  console.log(`${catalin[i]} - ${typeof catalin[i]}`);
}

// Log no elements after finding a number
console.log('BREAK LOOP AFTER FINDING A NUMBER: ');
for (let i = 0; i < catalin.length; i++) {
  if (typeof (catalin[i] == 'number')) {
    console.log('WE FOUND A NUMBER. TERMINATING ....');
    break;
  } else {
    console.log(`${catalin[i]} has the type ${typeof catalin[i]}`);
  }
}

console.log('LOOPING BACKWARDS: ');
// looping backwards
const myArray = [
  'something',
  26,
  'I guess so',
  'who really knows',
  'you know?',
];

for (let i = myArray.length - 1; i >= 0; i--) {
  console.log(i, myArray[i]);
}

console.log('LOOP INSIDE A LOOP: ');
// loop inside a loop
for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`-----Starting exercise ${exercise}`);

  for (let rep = 1; rep < 6; rep++) {
    console.log(`Lifting weights repetition ${rep} 😎`);
  }
}

console.log('WHILE LOOPS: ');
// while loop
let rep = 1;
while (rep <= 10) {
  console.log(`Lifting weights repetition ${rep} 😎`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log('You drew a 6...Loop is ending...');
}

// BIG CHALLENGE NUMBER 4
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

function calcTip(bill) {
  if (bill >= 50 && bill <= 300) {
    tip = (15 / 100) * bill;
    return tip;
  } else {
    tip = (20 / 100) * bill;
    return tip;
  }
}

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(bills[i] + tip);
}

for (let i = 0; i < bills.length; i++) {
  totals.push(bills[i] + tips[i]);
}

console.log(tips);
console.log(totals);

function calcAverage(arr) {
  let sum = 0;
  let average;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  average = sum / arr.length;
  return average;
}

console.log(calcAverage(totals));
