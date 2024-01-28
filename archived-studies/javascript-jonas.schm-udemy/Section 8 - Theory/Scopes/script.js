'use strict';

/*

SCOPES

There are 3 scopes: 
1. Global scope
    - Outside any function or block
    - Variables declared here are accessible everywhere

2. Function scope
    - Variables are accessible only inside the function, not outside
    - Also called local scope

3. Block scope
    - Variables are accessible only inside the block (for / if-else etc)
    - It only applies to let and const variables. Variables declared with var are not 
    block scoped
    - Functions are also block scoped but only in strict mode
*/

// Example 1
const myName = 'Jonas';

function first() {
  const age = 30;

  if (age >= 30) {
    const decade = 3; // scoped to if block
    var millenial = true; // scoped to first() function
  }

  function second() {
    const job = 'teacher';
    console.log(`${myName} is a ${age}-old ${job}`);
  }

  second();
}

first();

/*
- Scope has access to variables from all outer scopes.
- A child scope can access all of its parents' scopes, but parents can't access their
childs' variables

Global scope: 
myName = 'Jonas'

first() scope:
age = 30
millenial = true
myName = 'Jonas'

    second() scope:
    job = "teacher"
    age = 30
    millennial = true
    myName = "Jonas"  

    if block scope:
    decade = 3
    age = 30
    millennial = true
    myName = "Jonas"
*/

// Example 2
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `Hey, ${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;

      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Andrei';

      // Reassigning outer scope's variable
      output = 'NEW OUTPUT';

      const str = `Oh and you're a millenial, ${firstName}`;
      console.log(str);
    }
    // console.log(str)
    console.log(millenial);
    console.log(output);
  }

  printAge();

  return age;
}

const firstName = 'Catalin';
calcAge(1991);

// You are 46, born in 1991
// Oh and you are a millenial, Catalin
// True
// 46
// add is not defined

/*
- Call Stack-
add()
printAge()
calcAge()
*/
