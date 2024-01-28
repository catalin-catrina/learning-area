'use strict';

// Select the first node with the class .header
const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();

    // DOM traversing
    // Old way of doing it before remove() - we had to move up in the DOM tree
    // to the parent element of the element we wanted to delete, and delete it from there
    // message.parentElement.removeChild(message);
  });

// STYLES
// Styles are set directly in the DOM as inline styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// We can only read inline styles set with the style property
console.log(message.style.height); // prints nothing
console.log(message.style.width); // prints 120%

// We can get all the styles with the getComputedStyle function
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);

// won't work because getComputedStyle(message).height is a string (43.6667px)
message.style.height = getComputedStyle(message).height + 40 + 'px';

// so we need to take the number out of the string - parse the number from a string
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// Change a custom property (css variable)
// document.documentElement is :root in css - :root = html selector but with higher specif
document.documentElement.style.setProperty('--color-primary', 'orangered');

// can also use .setProperty to just change a property, but its easier to just use
// the classical syntax style.<propertyname> = ''  for that
message.style.setProperty('background-color', 'green');

// ATTRIBUTES
const logo = document.querySelector('.nav__logo');
const link = document.querySelector('.nav__link--btn');

// reading attributes
console.log(logo.alt);

// src and href attributes return the absolute urls when reading attributes this way
console.log(logo.src); // returns the absolute url
console.log(link.href); // returns the absolute url

// it's className instead of class for historical reasons
console.log(logo.className);

// another way of reading attributes - this can also read non-traditional attributes
// set in HTML, like gooddev = 'Leo'
// src and href attributes return the relative urls this way
console.log(logo.getAttribute('src')); // returns the relative url
console.log(link.getAttribute('href')); // returns the relative url
console.log(logo.getAttribute('alt'));

// here we read it with class instead of className
console.log(logo.getAttribute('class'));

// setting attributes
logo.alt = 'Nice logo';
console.log(logo.alt);

logo.setAttribute('alt', 'Beautiful logo');
console.log(logo.alt);

// DATA ATTRIBUTES - used to store data in the UI, in the HTML code
// data attributes are read in a different way compared to regular attributes
// we have to use the dataset object/property, where all the data type attributes are set
console.log(logo.dataset.versionNumber);

// CLASSES
logo.classList.add('c', 'd');
logo.classList.remove('c', 'd');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use because it overwrites all the existing classes and it allows us to
// only put one class on an element
logo.className = 'jonas';
