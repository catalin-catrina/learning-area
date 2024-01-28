'use strict';

/*

- JavaScript is a high-level, prototype-based obiect-oriented, multi-paradigm, interpreted
or just-in-time compiled, dynamic, single-threaded, garbage-collected programming language
with first-class functions and a non-blocking event loop concurrency model

1. High-level
    - Any computer program needs resources like ram and cpu. A low level language like C
    has to manage resources manually, while a high level language like JavaScript or
    Python does not have to worry about it because everything happens automatically

2. Garbage-collected
    - An algorithm inside the JavaScript engine which automatically removes old unused
    objects from the computer memory in order not to clog it up with unnecessary stuff

3. Interpreted or just-in-time compiled
    - 

4. Multi-paradigm
    - Paradigm means an approach and mindset of structuring code, which will direct your 
    coding style and technique: procedural programming, object oriented, and functional

5. Prototype-based object-oriented
    - Everything in JavaScript is an object, except primitives.
    - For example, we create arrays from an array blueprint/template, which is called
    the prototype, which contains all the methods. Then the arrays we create in our code
    will inherit the blueprint, through prototypal inheritance

6. First-class functions
    - Functions are simply treated as variables. We can pass them into other functions, 
    and return them from functions

7. Dynamically-typed
    - No data type definitions, types become known at runtime

8. Non-blocking event loop concurrency model
    - Concurrency model: how the JS engine handles multiple tasks happening at the same
    time
    - Why do we need that? Because JS runs in one single thread, so it can only do one
    thing at a time, so we need a way to handle multiple things happening at the same time
    - A thread is a set of instructions happening in a computer's CPU
    - So what about a long-running task? Sounds like it would block the single thread.
    However, we want non-blocking behavior
    - How do we achieve that? By using an event loop: takes long running tasks, executes 
    them in the background, and puts them back in the main thread once they are finished
*/
