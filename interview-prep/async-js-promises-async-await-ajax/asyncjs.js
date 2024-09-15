'use strict';

// a promise is created using the Promise constructor, which receives an executor function that takes 2 parameters (resolve and reject)
// in that promise constructor while you can perform synchronous operations, you generally want to perform some sort of async task

// a promise has 5 key properties, out of which only 2 of them are exposed to the user in the console when you log a promise
// those are [[PromiseState]] which can be pending or fulfilled, [[PromiseResult]] which takes the value passed into the resolve() or reject() methods in the promise constructor
// and 3 hidden ones managed by the JS engine behind the scenes: [[PromiseFulfillReactions]], [[PromiseRejectReactions]], [[PromiseIsHandled]]

// [[PromiseFulfillReactions]] and [[PromiseRejectReactions]] fields contain Promise Reaction Records
// we create a Promise Reaction Record by chaining a 'then' to a promise

// among other fields, thse Promise Reaction Records like [[PromiseFulfillReactions]] have a [[Handler]] field which contain the callback function passed to 'then'

// whenever we resolve a promise, resolve() is added to the callstack, [[PromiseState]] is set to 'fulfilled', [[PromiseResult]] is set to the value passed to resolve() and the Promise Reaction Record in this case [[PromiseFulfillReactions]]'s handler receives that result, then the handler's method (passed into then) is added to the microtask queue (which is where the event loop checks first whenever the call stack is empty, before looking at the Task queue, also called Callback Queue or Macrotask queue).

const promise = new Promise((resolve, reject) => {
  resolve('Done!'); // [[PromiseState]] is set to 'fulfilled' and [[PromiseResult]] is set to 'Done!'
  // reject("Fail!"); // [[PromiseState]] is set to 'rejected' and [[PromiseResult]] is set to 'Fail!'
});

console.log(promise);

// steps from creating a promise to resolving it start to finish
/* 
  1. new Promise() - promise constructor is added to the call stack and this creates the Promise object with a [[PromiseState]] set to pending [[PromiseResult]] undefined and [[PromiseIsHandled]] set to false
  2. (resolve, reject) => {...} - executor function is called and added to the stack
  3. setTimeout() is added to the stack, the functionality (() => resolve("Done")) is delegated to the Web APi which will keep track of the timer and everything is popped off the stack
  4. then() is added to the stack and creates a Promise Reaction Record with the callback that we provided as its handler, in other words the [[Handler]] property of the [[PromiseFulfillReactions]] object will be set to the callback passed into then ((result) => console.log(result)) and [[PromiseIsHandled]] will be set to True
  5. then() is popped off the stack
  6. the 2000ms passed to setTimeout finish and the callback passed into setTimeout is added to the Task queue
  7. the call stack is empty so the event loop will take the callback and move it onto the call stack
  8. the callback calls resolve(), which is added on the stack, [[PromiseState]] is set to 'fulfilled' and [[PromiseResult]] is set to 'Done', and it schedules the handler passed into then (result => console.log(result)) to the microtask queue
  9. () => resolve("Done") and resolve('Done) are popped off the stack, the Promise Reaction handler is moved by the Event Loop onto the 
  stack, which calls console.logs the result (also added onto the stack), then everything is popped off the stack and script finishes executing
*/
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Done'), 2000);
}).then(result => console.log(result));

// promise that reverts 2 numbers
let x = 5;
let y = 8;

const reverseNumbers = (a, b) => {
  return new Promise((resolve, reject) => {
    resolve([b, a]);
  });
};

reverseNumbers(x, y).then(result => {
  [x, y] = result;
});

// fetching data using fetch
fetch('https://jsonplaceholder.typicode.com/userss')
  .then(res => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  })
  .then(data => console.log('Fetched data using fetch', data))
  .catch(err => console.log('Failed to fetch data1.', err));

// fetching data using axios
axios
  .get('https://jsonplaceholder.typicode.com/postss')
  .then(result => console.log('Fetched data using axios', result.data))
  .catch(err => console.log('Failed to fetch data2.', err));

// some tests
let myInterval;
const myPromise = new Promise(resolve => {
  myInterval = setInterval(() => {
    console.log('interval');
    resolve('resolved');
  }, 2000);
}).then(data => console.log(data));

setTimeout(() => {
  clearInterval(myInterval);
}, 6000);
