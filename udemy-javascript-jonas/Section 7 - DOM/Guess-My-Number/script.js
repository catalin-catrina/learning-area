'use strict';

/*
// Selecting
console.log(document.querySelector('.message').textContent);

// Setting
document.querySelector('.message').textContent = '🎉🎉 Correct Number! 🏆';

// For input fields, we set values with .value instead of .textContent
document.querySelector('.guess').value = 23;
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;

let highestScore = 0;

// Event Listeners
// The first argument is the name of the event we're listening for. The second argument is the event handler, the code we want to execute when the event happens

document.querySelector('.check').addEventListener('click', function () {
  let guess = document.querySelector('.guess').value;
  guess = Number(guess);

  // When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No Number!';

    // When player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉🎉 Correct Number! 🏆';

    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('div.number').style.width = '30rem';

    // // Implementing Highscore
    if (score > highestScore) {
      highestScore = score;
      document.querySelector('.highscore').textContent = highestScore;
    }

    // When guess is too high
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '🔺🔺 Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent =
        '💥💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }

    // When guess is too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '🔻🔻 Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent =
        '💥💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  }
});

// Resetting the game by pressing "Again!"
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
});
