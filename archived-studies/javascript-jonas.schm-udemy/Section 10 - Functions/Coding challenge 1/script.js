'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer: function () {
    // Get answer
    let answer = prompt(
      `${this.question}\n${this.options.join('\n')}\n(Write option number)`
    );

    // Register Answer
    if (answer < 0 || answer > this.options.length || isNaN(answer) === true) {
      console.log('Pick a number between 0 and 3 inclusive');
    } else {
      answer = Number(answer);
      this.answers[answer]++;
    }

    // Call displayResults()
    this.displayResults();
    this.displayResults('string');
  },

  displayResults: function (type = 'array') {
    if (typeof type === 'array') {
      console.log(this.answers);
    } else if (typeof type === 'string') {
      console.log(`Poll results are ${[...this.answers]}`);
    }
  },
};

// Call registerNewAnswer() on click
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// Bonus part
const bonusObject = {
  answers: [5, 2, 3],
};
poll.displayResults.call(bonusObject);
poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
