'use strict';

const h1 = document.querySelector('h1');

// Going downwards - child elements
console.log(h1.querySelectorAll('.highlight'));
// childNodes property prints all the nodes of the element that it was called on
// childNodes also prints the text, because text is a node in the DOM as well
console.log(h1.childNodes);
// that's why the children property is used instead, because it only prints
// the actual HTML elements (tags) children of the element that it was used on
// children property only works on direct children
console.log(h1.children);
// firstElementChild property prints the first child that's an HTML element (not node)
console.log(h1.firstElementChild);
// firstElementChild property prints the last child that's an HTML element (not node)
console.log(h1.lastElementChild);

// Going upwards - parent elements
// Selecting a direct parent that's a node
console.log(h1.parentNode);
// Selecting a direct parent that's both a node and an element
console.log(h1.parentElement);

// select the closest parent element of h1 that has a class .header
// closest is kind of the opposite to querySelector
// querySelector finds child elements no matter how far down the tree
// closest finds parents no matter how far up tree
console.log(h1.closest('.header'));

// Going sideways - sibling elements that are elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// sibling elements that are nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// Get all sibling elements of h1 - we first move up tree then get all children of the
// direct parent
console.log(h1.parentElement.children);

// spread the HTML collection (children of the parent element of h1) into an array
// then loop through the array and downscale all elements except the h1 by 50%
// notice how easily we can compare DOM elements
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
