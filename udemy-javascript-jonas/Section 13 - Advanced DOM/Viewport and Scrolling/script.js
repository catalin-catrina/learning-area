'use strict';

/*
Viewport height and width:
document.documentElement.clientHeight
document.documentElement.clientWidth

Viewport offset compared to window object / top and left of the actual page:
scrollX
scrollY

Distance of the element relative to the viewport:
element.getBoundingClientRect()
*/

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // e.target is the element that was clicked (btnScrollTo)
  // getboundingClientRect() - relative to the viewport
  // prints x - distance from the left vp; y - distance from the top viewport
  console.log(e.target.getBoundingClientRect());

  // scrollX - horizontal scrolling / if 0 there's no horizontal scrolling
  // scrollY - vertical scrolling / distance between the top of the viewport and
  // the top of the page
  // Or we can say we scrolled scrollY pixels vertically until the point in the page
  // where we clicked the btnScrollTo buttonand scrollX pixels horizontally
  console.log('Current scroll (X/Y):', scrollX, scrollY);

  // getting the height and width of the client viewport
  console.log(
    'height/width viewport:',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling - current position + current scroll
  // scroll the distance from top of the viewport to where #section--1 starts
  // this is not good because it will only scroll to the #section--1 if
  // the top of the viewport == top of the page, but if we scroll down it won't work
  // window.scrollTo(s1coords.left, s1coords.top);

  // so we add the scroll to the distance from viewport, which will the total distance
  // from the top of the page, this will make it relative to the page not to the viewport
  // which is what we want
  window.scrollTo(s1coords.left + scrollX, s1coords.top + scrollY);

  // Old-school scrolling - calculating current position + current scroll
  window.scrollTo({
    left: s1coords.left + scrollX,
    top: s1coords.top + scrollY,
    behavior: 'smooth',
  });

  // Modern scrolling
  // section1.scrollIntoView({ behavior: 'smooth' });
});
