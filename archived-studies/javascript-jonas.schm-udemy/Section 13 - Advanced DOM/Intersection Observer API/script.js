'use strict';

// Sticky navigation with the Intersection Observer API
// the API allows code to observe changes to the way a certain target elem intersects
// another element or the viewport

// the object passed takes 3 arguments, root, treshold and rootMargin

// root = element that we want our target element (#section--1) to intersect (null = vp)
// threshold = percentage of intersection at which the observer callback will be called
// a threshold of 1.0 means that when 100% of the target is visible within the element
// specified by the root option, the callback is invoked
// a treshold of 0.0 means that the callback is invoked when the target is not visible
// within the specified root option
// rootMargin = box of x pixels that will be applied outside of our target element,
// for example if rootMargin: '90px' the target will appear 90px after the treshold

// the callback function will get called each time that the observed element (#section--1)
// is intersecting the root element at the threshhold that we defined, and right after
// the element gets out of the treshold and the isIntersecting property = false
// whenever #section--1 is intersecting the viewport (because we defined root: null)
// at 10% (because that's the threshold) then the callback will be called no matter if
// we scroll up or down

// the callback will be called with 2 arguments:
// entries: array of the threshold entries (in this case there's only one element there)
// observer: the object itself (IntersectionObserver(obsCallback, obsOptions))

// each entry is an object called IntersectionObserverEntry {}, which several parameters,
// most notable ones being:
// intersectionRatio (the time at which the callback was called 0.10 - the threshold we set)
// isIntersecting(true when the target, in our case #section--1, is intersecting the
// root/viewport (null = viewport)

const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null,
  threshold: 0.1, // 10%
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(document.querySelector('#section--1'));

////////////////////////////////////////////////////
// observer2 - will console.log an entry right when the #section--1 will be 20% in view
// of the viewport, and right when #section--0 is 0% (out of) the view of the viewport
const observer2 = new IntersectionObserver(
  function (entries) {
    entries.forEach(entry => console.log(entry));
  },
  {
    root: null,
    threshold: [0, 0.2],
  }
);

observer2.observe(document.querySelector('#section--1'));
