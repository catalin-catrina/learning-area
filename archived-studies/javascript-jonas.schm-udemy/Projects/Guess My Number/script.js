'use strict';

/*
Select an HTML element:
document.querySelector('.message');

Select the content of an HTML element:
document.querySelector('.message').textContent;

Select the content of an HTML input element:
document.querySelector('.guess').value;

Change the CSS of an element:
document.querySelector('body').style.backgroundColor = 'green';

Event listener:
document.querySelector('.check').addEventListener('click', function(){
    console.log(document.querySelector('.guess').value);
});

Function expression:
const x = function() {
    console.log(23);
}
*/

let score = 20;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (score > 1) {
    // No input
    if (!guess) {
      displayMessage('No number!🤔🤔🤔');
    }

    // When guess is wrong
    else if (guess !== secretNumber) {
      displayMessage(
        guess > secretNumber ? 'Too high!😜😜😜' : 'Too low!🤣🤣🤣'
      );
      score--;
      document.querySelector('.score').textContent = score;
    }

    // Player wins
    else {
      displayMessage('You win!🏆🏆🏆');
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
      }
    }
  }

  // Player loses
  else {
    displayMessage('You lost the game!😢😢😢');
    score--;
    document.querySelector('.score').textContent = score;
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  displayMessage('Start guessing...');

  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
