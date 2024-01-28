'use strict';

/*

Now let's see what happens after the code has finished executing.

1. A GLOBAL EXECUTION CONTEXT is created for top-level code - code that is not inside any
function - there's only one execution context no matter how big the app is

2. Execution of top-level code inside the global execution context

3. Execution of functions and waiting for callbacks
    - One execution context per function: for each function call, a new execution context
    is created


------------------------------------------------------------------------------------

EXECUTION CONTEXT - Generated during "creation phase", right before execution
 - What's inside?
    1. Variable environment
        - 'let', 'const' and 'var' declarations
        - functions
        - 'arguments' object - contains all the arguments that were passed into the 
        function that the current execution context belongs to
                        - however, a function can also access variables that are outside
                        of the function. 
                        - this works because of something called the scope
                        chain

    2. Scope chain - consists of variables that are located outside of the current
                function
    
    3. 'this' keyword

    - ARROW FUNCTIONS DON'T GET the 'arguments' object and the 'this' keyword
        - instead, they can use the 'arguments 'object' and the 'this' keyword from
        their closest regular function parent


---------------------------------------------------------------------------------


THE CALL STACK - 'place' where execution contexts get stacked on top of each other, to 
keep track of where we are in the execution

Compiled code starts execution:
    1. Execution of top-level code; an execution context will be created for the top
    level code

CALL STACK:
    second()
    first()
    Global
        const name = 'Jonas';
        const first = ()
        function second(x, y)
*/

const name = 'Jonas';

const first = () => {
  let a = 1;
  const b = second(7, 9);
  a = a + b;
  return a;
};

function second(x, y) {
  var c = 2;
  return c;
}

const x = first();
