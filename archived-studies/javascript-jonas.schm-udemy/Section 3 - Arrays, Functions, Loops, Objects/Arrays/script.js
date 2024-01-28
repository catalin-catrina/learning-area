const friends = ['Michael', 'Steven', 'Peter'];

console.log(friends[1]); // print the 2nd element

console.log(friends.length); // print the length of the array

console.log(friends[friends.length - 1]); // print the last element

friends[2] = 'Jay'; // friends is now [Michael, Steven, Jay]

// coding challenge 2
function calcTip(bill) {
  let tip;
  if (bill >= 50 && bill <= 300) {
    tip = (15 / 100) * bill;
  } else {
    tip = (20 / 100) * bill;
  }
  return tip;
}

let bills = [125, 555, 44];

let tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

console.log(tips);

// Array methods
const people = ['Leo', 'Cata', 'Andrei'];

// adding an element to the end and return it's length
newLen = people.push('Adi');

// adding an element to the beginning and return it's length
people.unshift('Andreea');

// removes last element and returns the value
const lastPopped = people.pop();

// removes first element and returns the value
people.shift();

// returns the index of the first occurrence or -1 if it's not there
console.log(people.indexOf('Cata'));

// returns true if the element is in the array and false otherwise
console.log(people.includes('Leo'));

if (people.includes('Andrei')) {
  console.log('Te upa varu Andrei');
}
