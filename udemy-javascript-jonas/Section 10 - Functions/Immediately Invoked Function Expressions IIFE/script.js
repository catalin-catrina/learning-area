'use strict';

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// We need to wrap it in () because JS expects a function statement because we started
// this line of code with the function keyword
// however we can trick JS into thinking it's an expression by wrapping it in ()
(function () {
  console.log(
    'This will never run again, but we did not call it so it will not print'
  );
});

// Because it's only a function value now, a function expression, we can call it straight
// away - IIFE
(function () {
  console.log(
    'This will never run again, we called it here and can not use it again'
  );
  const isPrivate = 23;
})();

(() => console.log('Arrow functions in IIFE form'))();

/*
Why was this invented? Well we know that functions create scopes, and a scope does not
have access to variables from an inner scope, therefore all data defined inside a scope
is private, we also say this data is encapsulated.
the isPrivate variable is encapsulated in its function scope (applies to all functions, 
  not only IIFE)
*/

/*
Also remember that variables declared with let and const create their own scope inside
a block

This is the reason IIFE are not that used anymore, because if all we want is to create
a new scope for data privacy, all we need to do is to just create a block like below,
there is no more need to create a function to create a new scope, unless for some
reason we wanted to use var to declare our variables

However if all you want is to execute a function only once, the IIFE is still the way
to go
*/

{
  const alsoPrivate = 23;
  var notPrivate = 25;
}

// console.log(alsoPrivate);
console.log(notPrivate);
