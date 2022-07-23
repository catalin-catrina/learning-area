'use strict';

/*

- The JS engine is a program that executes JS code. 

- Every browser has its own JS engine, but the most well known JS engine is Google's V8
    - it powers Google Chrome but also NodeJS, which is a JS runtime used to build the
    back-end for web applications

- JS engine contains a CALL STACK and a HEAP.

- The CALL STACK is where our code is executed using a so called Execution Context.

- The HEAP is an unstructured memory pool which stores all the objects which our app
needs

- Compilation: Entire code is converted into machine code at once, and written to a
binary file that can be executed by a computer
    Source code -> Portable file: machine code -> program running

- Interpretation: Interpreter runs through the source code and executes it line by line

- Just-in-time (JIT) compilation: Entire code is converted into machine code at once,
then executed immediately
    Source code -> Machine code -> program running

As a piece of JS code enteres the engine, the first step is to parse the code 
(read the code)
    - The code is parsed into a data structure called Abstract Syntax Tree (AST), by
    first splitting up the code into pieces that are meaningful to the language like
    the const and function keywords, then saving all these pieces into the tree
    in a structured way. This step also checks if there are any syntax errors, and the
    resulting tree will later be used to generate the machine code

The second step is compilation, which takes the resulting AST and compiles it into 
machine code.

This machine code then gets executed right away without creating an executable file,
like C does, because JS is a JIT language. The execution happens inside the JS engine,
more precisely in the Call Stack

Modern JS engines, like Google's V8, have some very clever opitmization strategies
    - What they do, is they first create an unoptimized version of machine code in the
    beginning, just so it can start executing ASAP. 
    - In the background, this code is getting optimized and recompilled during the already
    running program execution. This can be done multiple times and each time the old 
    unoptimized code is simply getting swept for the new optimized code w/o ever stopping
    execution

HOW JAVASCRIPT WORKS:
    - We can imagine a JS runtime as a big box/container, which includes all the things
    we need to use JS, in this case, in the browser

    A JS runtime is made of:
        1. JS engine, which is at the heart of any JS runtime
            - A JS engine is made of a HEAP and a CALL STACK

        2.1 WEB APIs (in the browser)
            - DOM, Timers, Fetch API, etc
            - Everything related to the DOM, the timers, or even the console.log() that
            we use all the time
            - WEB APIs are functionalities that are provided to the engine, but which are
            actually not part of JS itself
            - JS gets access to these APIs through the global window object
            
        2.2 C++ Bindings & Thread Pool (in nodeJS)

        3. CALLBACK QUEUE
            - it's a data structure that contains all the callback functions that are
            ready to be executed
            - click, timer, data
            - Example: Callback function from DOM event listener
            - The EVENT LOOP (essential for non-clocking concurrency model) takes the 
            functions from the CALLBACK QUEUE and puts them in the CALL STACK so they 
            can be executed
*/
