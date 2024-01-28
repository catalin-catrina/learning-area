const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/* 1. Loop over the game.scored array and print each player name to the console,
along with the goal number (Example: "Goal 1: Lewandowski") */
/* Like I learned in the Enhanced object literals lecture, in ES6 we can also 
compute properties - we want goals to start from 1 not 0 */
for (const player of game.scored.entries()) {
  console.log(`Goal ${[player[0] + 1]}: ${player[1]}`);
}

// Alternate solution: can destructure the 'player' array into index and value
for (const [index, value] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${value}`);
}

/* 2. Use a loop to calculate the average odd and log it to the console */
let sum = 0;
for (const odd of Object.values(game.odds)) {
  sum += odd;
}
let average = sum / Object.values(game.odds).length;
console.log(average);

/* 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them
(except for "draw") */

for (const [key, value] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${game[key] ? 'victory' : 'draw'} ${game[key] ?? ''}: ${value}`
  );
}

/* 4. Bonus: Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
{
Gnarby: 1,
Hummels: 1,
Lewandowski: 2
} */

let scorers = {};
for (i of game.scored) {
  !scorers[i] ? (scorers[i] = 1) : (scorers[i] += 1);
}

console.log(scorers);
