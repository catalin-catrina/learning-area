/*
Hoisting = accessing a variable before it was declared
TDZ = The dead zone, it starts at the beginning of the current scope, until the point of 
the code where the variable is defined

Variables declared with var are hoisted, with the value of undefined
Variables declared with let and const are not hoisted, therefore cannot be accessed 
before they were declared

Function declarations are hoisted (they can be called before they were defined)
Function expressions and Arrow functions declared with let or const are not hoisted, 
they cannot be called before they were declared.
*/

// Hoisting for variables
console.log(me); // undefined
// console.log(job); // cannot access 'job' before initialization
// console.log(year); // cannot access 'year' before initialization

var me = 'Jonas';
let job = 'teacher';
const year = 1994;

// Hoisting for functions
console.log(addDeclaration(2, 3));
// console.log(addExpression(4, 5));
// console.log(addArrowFunction(4, 2));

function addDeclaration(a, b) {
  return a + b;
}

const addExpression = function (a, b) {
  return a + b;
};

const addArrowFunction = (a, b) => a + b;

// Example
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted');
}

/* 
Last example - variables declared with var are created as properties in the 'window'
object
*/
var x = 1;
let y = 2;
const z = 3;

console.log(x, window.x);
console.log(x === window.x);
console.log(window.y, window.z);
