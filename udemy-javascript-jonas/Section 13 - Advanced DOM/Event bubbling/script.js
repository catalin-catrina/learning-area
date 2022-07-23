'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  // Open account button is a link with href="#" which has a default behaviour of
  // scrolling back to the top when clicked.we want to get rid of that
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Event propagation - bubbling
// By default, elements only listen for event propagation in the bubbling phase
// when we click on a child element, we also trigger the event handlers of the
// same type (in this case "click") of all the parent elements that have that event
// handler attached to them

// the event originates in e.target, where the click happens, and then it bubbles up
// to all of its parent elements in the DOM tree
// so we can then handle that event in the parent elements

// function generating a random int
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// function generating an rgb color using the randomint function
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// e.target will be whatever we click
// e.currentTarget is the element on which the event handler is attached
// e.currentTarget === this variable in event listeners
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  // e.target = where the click happened, NOT the element on which the event was attached
  console.log(
    'Event triggered by clicking on:\n',
    e.target,
    '\nElement being handled is:\n',
    e.currentTarget
  );

  console.log(e.currentTarget === this);

  // Stop event propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(
    'Event triggered by clicking on:\n',
    e.target,
    '\nElement being handled is:\n',
    e.currentTarget
  );

  console.log(e.currentTarget === this);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log(
      'Event triggered by clicking on:\n',
      e.target,
      '\nElement being handled is:\n',
      e.currentTarget
    );

    // This event shows up first in the console is because we specified a third parameter
    // to the callback function, useCapture, which can be either true or false, false
    // if not specified by default, and the parent element catches the event listener first
    // before the child element which triggered the event - in capturing phase when
    // the event is propagating down from the document root to the child element that
    // triggered the event
    console.log(
      'This shows up first in the log because of a 3rd parameter to the callback function, useCapture, which we set to true to capture the event in the capturing phase before being propagated down to the child element that actually triggered the event in the first place'
    );

    console.log(e.currentTarget === this);
  },
  true
);
