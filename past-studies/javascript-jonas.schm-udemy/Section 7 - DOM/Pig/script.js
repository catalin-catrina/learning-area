'use strict';

// Hide dice
document.querySelector('.dice').classList.add('hidden');

// Reset scores in UI
document.getElementById('score--0').textContent = 0;
document.getElementById('score--1').textContent = 0;

// Reset scores in code
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Dice roll
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    // Generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    document.querySelector('.dice').classList.remove('hidden');
    document.querySelector('.dice').src = `dice-${dice}.png`;

    // Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore = currentScore + dice; // in code
      document.getElementById(`current--${activePlayer}`).textContent = currentScore; // in UI
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;

      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

      if (activePlayer == 0) activePlayer = 1;
      else if (activePlayer == 1) activePlayer = 0;

      document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    }
  }
});

// Holding
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] = scores[activePlayer] + currentScore; // in code
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]; // in UI

    currentScore = 0; // in code
    document.getElementById(`current--${activePlayer}`).textContent = 0; // in UI

    if (scores[activePlayer] >= 100) {
      // If total score >= 100, current player wins
      playing = false;
      document.querySelector('.dice').classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // Switch to next player; can also do it like this
      activePlayer = activePlayer === 0 ? 1 : 0; // in code

      // in UI
      document.querySelector('.player--0').classList.toggle('player--active');
      document.querySelector('.player--1').classList.toggle('player--active');
    }
  }
});

// New game
document.querySelector('.btn--new').addEventListener('click', function () {
  // Displaying the dice
  document.querySelector('.dice').classList.remove('hidden');

  // Resetting values in code
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Resetting values in UI
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--active', 'player--winner');
});
