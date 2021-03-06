'use strict';

const gameEvents = new Map([
  [17, 'β½ GOAL'],
  [36, 'π Substitution'],
  [47, 'β½ GOAL'],
  [61, 'π Substitution'],
  [64, 'πΆ Yellow card'],
  [69, 'π΄ Red card'],
  [70, 'π Substitution'],
  [72, 'π Substitution'],
  [76, 'β½ GOAL'],
  [80, 'β½ GOAL'],
  [92, 'πΆ Yellow card'],
]);

/* 1. Create an array 'events' of the different game events that happened (no
duplicates) */
// Get the values of the map and put them in an array
let arrayEvents = [...gameEvents.values()];

// Create a set out of that array to remove duplicates
let setEvents = new Set(arrayEvents);

// Overwrite the old array with the unpacked elements of the set that has no duplicates
arrayEvents = [...setEvents];

/* 2. After the game has finished, is was found that the yellow card from minute 64
was unfair. So remove this event from the game events log. */
gameEvents.delete(64);

/* 3. Compute and log the following string to the console: "An event happened, on
average, every 9 minutes" (keep in mind that a game has 90 minutes) */
// Get how many minutes - get last minute (92) - pop() deletes and returns last elem
const time = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

/* 4. Loop over 'gameEvents' and log each element to the console, marking
whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: β½GOAL */
for (const [key, value] of gameEvents) {
  const half = key < 45 ? '[FIRST HALF]' : '[SECOND HALF]';
  console.log(`${half} ${key}: ${value}`);
}
