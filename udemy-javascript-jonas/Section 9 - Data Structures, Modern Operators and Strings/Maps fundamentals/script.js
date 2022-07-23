'use strict';

// A map is a data structure that maps values to keys, like objects

// The difference is that the keys in maps can have any type - in objects they're strings

// Create a map
const rest = new Map();

// Add elements (key-value pairs) to map
// set() method adds an element to the map and also returns the whole updated map
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');

/* Since every call of the set() method returns the whole updated map ('rest'),
we can then keep calling set after set and add elements to the map */
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(')
  .set(undefined, 'This works too');

console.log(rest);

// Getting elements out of map
console.log(rest.get('name'));
console.log(rest.get(true));

// Check if a key exists
console.log(rest.has('categories'));

// Delete a key-value pair (based on key name)
rest.delete(2);

// Length of map
console.log(rest.size);

// Clear a map
// rest.clear();

// Arrays as map keys
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr));

/*
    This does not work because the arrays [1, 2] in rest.set and rest.get are not the
    same object, even though they have the same elements. 
    The key is EXACTLY the object [1, 2] wrote in rest.set, not the one in rest.get
    So we have to create a variable to store a reference to that array in it, like above
*/
rest.set([1, 2], 'Test2');
console.log(rest.get([1, 2]));

// Using an HTML element as key
rest.set(document.querySelector('body'), 'Body of my page');
console.log(rest);
