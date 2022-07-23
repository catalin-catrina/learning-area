'use strict';

// -----SELECT ELEMENTS-----
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// Select the first node with the class .header
const header = document.querySelector('.header');

// Select all nodes that have the class .section - returns a node list
const allSections = document.querySelectorAll('.section');

console.log(allSections);

// Select the node with the id .section--1
document.getElementById('section--1');

// Select all elements that have the <button> tag - returns an HTML collection
// Difference between a node list and an html collection is that the collection
// updates automatically when there are changes in the DOM
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// Selects all elements that have the btn class - returns an HTML collection
console.log(document.getElementsByClassName('btn'));

// -----CREATE AND INSERT ELEMENTS-----
/*
element.insertAdjacentHTML(position, text)
position can be: beforebegin, afterbegin, beforeend, afterend
text is the string to be parsed as HTML

<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->

When inserting HTML into a page by using insertAdjacentHTML(), be careful not to 
use user input that hasn't been escaped.

You should not use insertAdjacentHTML() when inserting plain text. Instead, use the 
Node.textContent property or the Element.insertAdjacentText() method. This doesn't 
interpret the passed content as HTML, but instead inserts it as raw text.
*/

// afterbegin and beforeend inserts the element inside the tags of the selected element
document
  .querySelector('.header__title > button')
  .insertAdjacentHTML('beforebegin', '<p>Paragraph inserted beforebegin</p>');
document
  .querySelector('.header__title > button')
  .insertAdjacentHTML('afterend', '<p>Paragraph inserted afterend</p>');

// createElement
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// prepend() adds / moves the element as the first child of the header element
// append() adds / moves(if it exists) the element as the last child of the header elem
// here we don't insert message two times, we first insert it as the first child,
// then we move it to the bottom, so the header.prepend(message) is overwritten
// a DOM element (e.g message) is unique, it can only exist in one place at a time
// header.prepend(message);
header.append(message);

// if we want the same element in two places, we need to copy it using the cloneNode() fct
// cloneNode() takes true as a parameter which means we also want to copy all the children
// header.prepend(message.cloneNode(true));

// insert message element before the header element - as siblings
// header.before(message);

// insert message element after the header element - as sibligns
// header.after(message);

// -----DELETE ELEMENTS-----
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();

    // DOM traversing
    // Old way of doing it before remove() - we had to move up in the DOM tree
    // to the parent element of the element we wanted to delete, and delete it from there
    // message.parentElement.removeChild(message);
  });
