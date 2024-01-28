'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

/*
Selecting the first or the only element
document.querySelector(.<selectedElement>)

Selecting all elements
document.querySelectorAll(.<selectedElement>)
- To perform operations we need to use a for loop like this:
for (let i = 0; i < document.querySelector('etc').length; i++)

There are 2 ways to select IDs
document.querySelector('#score--0');
document.getElementById('score--1');

Event listeners
document.querySelector(.<selectedElement>).addEventListener('click', function(){})

Keyboard events:
keyup event happens when we lift our finger from the key
keypress event happens continuously as we keep our finger on a certain key
keydown happens when we press down a key, and it's usually the one we use

Adding a class to an element
document.querySelector(.<selectedElement>).add(<addedClass>)

Removing a class from an element
document.querySelector(.<selectedElement>).remove(<removedClass>)

Check if an element has a class
document.querySelector(.<selectedElement>).contains(<class>)
*/

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

// we pass e as a parameter to the function to get information about the event; it returns an object that contains all the information we need
document.addEventListener('keydown', function (e) {
  // console.log(e);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
