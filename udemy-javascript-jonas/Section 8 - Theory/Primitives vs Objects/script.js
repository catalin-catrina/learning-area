'use strict';

// The JS Engine has 2 components: the CALL STACK and the HEAP

/*
- Primitives: Number, String, Boolean, Undefined, Null, Symbol, BigInt
- Primitive types are stored in the CALL STACK - stored in the execution context in
which they are declared
- Primitives receive an Identifier (lastName), an Address (e.g:0001), and a Value
('Williams'). The Identifier points to the Address, and not to the Value itself
*/
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

/*
- Objects are reference values because they are stored in the HEAP. The CALL STACK
only keeps a reference to the memory position at which the object is stored in the HEAP
*/
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

/*
- It looks like we're copying the object, but we're just copying the reference to the
memory position of the same object: jessica
- marriedJessica is not a new object in the HEAP, it's just another variable in the
CALL STACK, which holds the reference to the original object.
- Both of these objects point to the same memory address in the HEAP
*/
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage: ', jessica);
console.log('After marriage: ', marriedJessica);

// Copying objects
const jessicaTwo = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Allice', 'Bob'],
};
const jessicaTwoCopy = Object.assign({}, jessicaTwo);
jessicaTwoCopy.lastName = 'Davis';

/*
However, Object.assign only works at the first level. It only works with primitive
properties
Both objects: jessicaTwo and jessicaTwoCopy have a property called family which
points to the same object in the memory heap (the array object), so when we change
it in an object, it's also going to be changed in the other one.
*/
jessicaTwoCopy.family.push('Mary');
jessicaTwoCopy.family.push('John');

console.log(jessicaTwo);
console.log(jessicaTwoCopy);
