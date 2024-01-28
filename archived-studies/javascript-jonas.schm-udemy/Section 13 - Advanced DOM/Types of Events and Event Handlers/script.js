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

// Creating the cookies bar element and deleting it on btn click
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
document.querySelector('.header').append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // Modern scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');

// TYPES OF EVENTS AND EVENT HANDLERS
// we can attach an event handler to an element in two ways:
// element.addEventListener() is better because it allows us to add multiple events
// to the same type of event on the same element, while the old method overwrites
// the previous events, the addEventListener() also allows us to delete the event
//
// modern way of attaching an event listener to an element
h1.addEventListener('mouseenter', function (e) {
  // mouseenter works like :hover in css
  alert('addEventListener: Great! You are reading the heading :D');
});

// old way of attaching an event listener
h1.onmouseenter = function (e) {
  alert('onmouseenter1: Great! You are reading the heading :D');
};

// This doesnt overwrite the first event listener added with addEventListener
h1.addEventListener('mouseenter', function (e) {
  alert('addEventListener2: Great! You are still reading the heading :D');
});

// This will overwrite the previous event listener added the old way
h1.onmouseenter = function (e) {
  alert('onmouseenter2: onmouseenter2 overwritten onmouseenter1');
};

// Deleting an event listener after it was triggered once
// we add the event listener and remove it in the same function
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// We can remove the event listener at any place in our code
// here we remove it after 3s have passed
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// we can also handle events using an HTML attribute - not recommended because the modern
// way with addEventListener can add multiple events to an element, while onclick
// overwrites all the others, addEventListener can also take a third argument that
// can control the event propagation
// <h1 onclick="alert('HTML alert')">This is an H1</h1> - written in HTML of course
