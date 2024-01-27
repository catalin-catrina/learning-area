'use strict';

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// We store the result of calling greet('Hey') with the 'Hey' parameter, which is
// function(name) {console.log(`Hey ${name}`)}
// calling greet returns a new function that we store into greeterHey, so greeterHey()
// is now just a function, that we call
const greeterHey = greet('Hey');

// We then call greeterHey
greeterHey('Jonas');
greeterHey('Steven');

// We can also do it all in one go - this makes more sense
greet('Hello')('Jonas');

// Writing the greet function using arrow functions
const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name}`);
