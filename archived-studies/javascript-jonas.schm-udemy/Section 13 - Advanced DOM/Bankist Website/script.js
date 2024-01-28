'use strict';

///////////////////////////////////////
// VARIABLES
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const slides = document.querySelectorAll('.slide');
const slideBtnRight = document.querySelector('.slider__btn--right');
const slideBtnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');

///////////////////////////////////////
// MODAL WINDOW
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

///////////////////////////////////////
// COOKIES BAR
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

///////////////////////////////////////
// LEARN MORE BUTTON SCROLLING
btnScrollTo.addEventListener('click', function (e) {
  // Modern scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// PAGE NAVIGATION
// Not optimal because we attach an event listener on every link
// so we use event delegation
// document.querySelectorAll('.nav__link').forEach((el, i) => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//
//     // // my solution
//     // document
//     //   .querySelector(`#section--${i + 1}`)
//     //   .scrollIntoView({ behavior: 'smooth' });
//
//     // jonas solution
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////////
// TABBED COMPONENT
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause in case clicked === null because user cliked tabsContainer
  // which doesn't have an element with class .operations__tab as sibling or parent
  if (!clicked) return;

  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Active content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////////
// Menu fade animation
// opposite of mouseenter is mouseleave
// opposite of mouseover is mouseout

// we created a function that does the fading anim, then we pass it in the event listener
// as the handler function while using the bind method which returns a new function
// but doesnt call it (we can't call a function in an event listener)
// remember that the bind method sets the this keyword to whatever we pass in bind()

const handleHover = function (e) {
  // we don't use the closest method because there are no child elements that we could
  // accidentally click in the .nav__link element so a simple if check is enough
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// easier solution - we pass an opacity parameter to handleHover and call with
// 0.5 on mouseover and 1 on mouseout
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// more elegant solution
// eventListener can only ever take one argument, the event (e), this is a workaround
// if we need to pass additional parameters into the handler function of an event
// listener, we need to use bind and take advantage of the this keyword
// if we wanted multiple values we could have passed an array or object instead of
// only one value
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////////////////////////
// STICKY NAVIGATION WITH SCROLL EVENT LISTENER
// not very optimal method because the scroll event triggers after every scroll
// bad performance which may affect some older devices
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   // scrollY - the position between the viewport and top of the page
//   // section1.getBoundingClientRect().top = top position of section1
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// STICKY NAVIGATION WITH INTERSECTION OBSERVER API
// the API allows code to observe changes to the way a certain target elem intersects
// another element or the viewport
const headerObserver = new IntersectionObserver(
  function (entries) {
    // destructuring - get the first element out of entries - entries[0]
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  },
  {
    root: null,
    threshold: 0.0,
    rootMargin: `-${nav.getBoundingClientRect().height}px`,
  }
);

headerObserver.observe(document.querySelector('.header'));

//////////////////////////////////////////////////////
// REVEALING ELEMENTS ON SCROLL USING THE INTERSECTION OBSERVER API
document
  .querySelectorAll('.section')
  .forEach(section => section.classList.add('section--hidden'));

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting)
        entry.target.classList.remove('section--hidden');
      headerObserver.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0.2,
  }
);

document
  .querySelectorAll('.section')
  .forEach(section => sectionObserver.observe(section));

////////////////////////////////////////////////////
// LAZY LOADING IMAGES USING THE INTERSECTION OBSERVER API
const callbackToimgObs = function (entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Replace low resolution src with high res data-src
    entry.target.src = entry.target.dataset.src;

    // we only remove the blur once the image has finished loading (on slow networks)
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });

    // Stop observing
    imagesObserver.unobserve(entry.target);
  });
};
const imagesObserver = new IntersectionObserver(callbackToimgObs, {
  root: null,
  threshold: 0.8,
  rootMargin: '-80px',
});
document
  .querySelectorAll('img[data-src]')
  .forEach(image => imagesObserver.observe(image));

///////////////////////////////////////////////////
// SLIDER
// Slider based on transform: translateX()
// Default: First slide at 0%, second at 100%, third at 200% etc ...
// Btn right: current slide at -100%, next right slide at 0%
//            if current slide = max slide go back to first slide
// Btn left: current slide at 100%, next left slide at 0%
//            if current slide = 0 go to last slide

// Logic explanation: how changing the slider to right works:
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - currentSlide)}%)`));
// if current slide = 0 => currentslide = 1 =>
//      first iteration(first slide): translateX(100 * (0 - 1)) = translateX(-100%)
//      second iteration(second slide): translateX(100 * (1 - 1)) = translateX(0%)
//      third iteration(third slide): translateX(100 * (2 - 1)) - translateX(100%)

// if current slide = 1 => currentslide = 2 =>
//      first iteration(first slide): translateX(100 * (0 - 2)) = translateX(-200%)
//      second iteration(second slide): translateX(100 * (1 - 2)) = translateX(-100%)
//      third iteration(third slide): translateX(100 * (2 - 2)) - translateX(0%)

//  ...

// if current slide = max slide - 1 => currentslide = 0 and start over

// changing the slider to left works the same except we decrement currentslide instead

const slider = function () {
  // Keep track of current slide
  let currentSlide = 0;

  // Define what the max slide index is
  let maxSlide = slides.length - 1;

  // Modify the translateX property of each slide based on left/right click/arrow
  // Slide with translateX(0%) is only one displayed
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  const goToSlide = function (currSlide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - currSlide)}%)`)
    );
  };

  // Right button callback functionality
  const nextSlide = function () {
    currentSlide === maxSlide ? (currentSlide = 0) : currentSlide++;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  // Left button callback functionality
  const prevSlide = function () {
    currentSlide === 0 ? (currentSlide = maxSlide) : currentSlide--;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  // Insert HTML - insert dots below the slide
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Insert active class to active dot/slide
  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // Call
  const slideInit = function () {
    goToSlide(0);
    createDots();
    activeDot(0);
  };
  slideInit();

  // Event handlers
  // clicking left/right buttons
  slideBtnRight.addEventListener('click', nextSlide);
  slideBtnLeft.addEventListener('click', prevSlide);

  // pressing left/right keys
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  // clicking dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  });
};
slider();
