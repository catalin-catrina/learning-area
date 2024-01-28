// CLOSURES
// A function has access to the variable environment of the execution context in which it was created

function multipler(factor) {
  return number => number * factor;
}

console.log(multipler(2)(5));

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers
// the anonymous function inside secureBooking() has access to the variable environment of the secureBooking() execution context, even though secureBooking() has been removed from the stack the moment it was called and assigned to booker
// when booker() is called, the engine will look for the passengerCount++ variable in the current execution context, which is the execution context of the anyonymous function declared inside secureBooking, and it won't be able to find the variable there. It will then look at the variable environment of the execution context in which the function was created (closure), which is basically secureBooking, and it will find the variable there. The engine looks at the closure before looking up the scope chain
// the variable environemnt of the execution context in which the anonymous function was created stays with the function forever, being able to remember the passengerCount value.
// everytime we call the booker() function, the passengerCount value gets updated. The function keeps a reference to its outer scope which preserves the scope chain throughout time.

console.dir(booker); // has a [[Scopes]] property ([[example]] type properties means they're internal properties that can't be accessed through code), which is in itself an object that contains the variable environment of the booker function, the first property of this object being 0: Closure, which contains the updated passengerCount variable
