'use strict';

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

// Click event listener on the button
document.querySelector('button').addEventListener('click', function () {
  // Get the input value of the textarea
  let text = document.querySelector('textarea').value;

  // Split by newline to create an array of every word
  const underscoreArray = text.split('\n');

  // Array of arrays where every word in split by underscore (_)
  let myArr = [];

  let camelCaseArray = [];

  // Iterate over every word
  for (let i = 0; i < underscoreArray.length; i++) {
    // Trim every word of whitespace and lowercase everything
    underscoreArray[i] = underscoreArray[i].trim();
    underscoreArray[i] = underscoreArray[i].toLowerCase();

    // Split every word by _ so we can uppercase the second
    myArr.push(underscoreArray[i].split('_'));
  }

  // Iterate over the array of arrays - x[1] will be the second word in every iteration
  for (let x of myArr) {
    // uppercase second element (word) and overwrite it
    x[1] = x[1][0].toUpperCase() + x[1].slice(1);

    // Join the words of every sub array and push into new array
    camelCaseArray.push(x.join(''));
  }

  console.log(camelCaseArray);

  for (let i = 0; i < camelCaseArray.length; i++) {
    camelCaseArray[i] = camelCaseArray[i].padEnd(25, ' ');
    camelCaseArray[i] = camelCaseArray[i] + '✅'.repeat(i + 1);
    console.log(camelCaseArray[i]);
  }

  // Overwrite initial text with elements of camel array joined by newline
  text = camelCaseArray.join('\n');
});
