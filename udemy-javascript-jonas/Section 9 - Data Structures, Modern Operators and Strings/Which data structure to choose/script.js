'use strict';

/**
Sources of data:
1. From the program itself: Data written directly in source code (e.g status messages)
2. From the UI: Data input from the user or data written in DOM (e.g tasks in to do app)
3. From external sources: Data fetches for example from web API (e.g recipe objects)

No matter where we receive the data, we receive a collection of data which we
store in data structures

What data structure to use?
- for simple lists: Arrays or Sets
- for key/value pairs: Objects or Maps

Data from web APIs usually come in JSON format, which is basically an object containing
key/value pairs, so we want to use Objects for that.

Built in data structures: Arrays, Sets, Objects, Maps, WeakMap, WeakSet
Non-built in data structures: Stacks, Queues, Linked lists, Trees, Hash tables

Arrays: - use when you need ordered list of values (might contain duplicates)
    - use when you need to manipulate data

Sets: - use when you need to work with unique values
    - use when high-performance is really important
    - use to remove duplicates from arrays

Objects: - more traditional key/value store
    - easier to write and access values with . and []
    - use when you need to include functions (methods)
    - use when working with JSON (can convert to map)

Maps: - better performance than objects
    - keys can have any data type
    - easy to iterate
    - easy to compute size
    - use when you simply need to map keys to values
    - use when you need keys that are not strings
*/
