'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;

let highestScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  let guess = document.querySelector('.guess').value;
  guess = Number(guess);

  // When there is no input
  if (!guess) {
    displayMessage('⛔ No Number!');

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉🎉 Correct Number! 🏆');

    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('div.number').style.width = '30rem';

    // // Implementing Highscore
    if (score > highestScore) {
      highestScore = score;
      document.querySelector('.highscore').textContent = highestScore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }

    displayMessage(guess > secretNumber ? '🔺🔺 Too high!' : '🔻🔻 Too low!');

    /*
    document.querySelector('.message').textContent =
      guess > secretNumber ? '🔺🔺 Too high!' : '🔻🔻 Too low!';
    */
  }
});

// Resetting the game by pressing "Again!"
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
});
