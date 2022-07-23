'use strict';

// DOMContentLoaded
// this event is fired by the document as soon as HTML is completely parsed (HTML
// has been downloaded and been converted to the DOM tree; also all scripts must be
// downloaded and executed before the DOMContentLoaded event can happen)
// this event does not wait for images and other external resources to load, only
// HTML and JS need to be loaded

// With this we can execute code that should only be executed after the DOM is ready/
// available, but we don't need to wrap our code into an event listener like this
// because we have the script tag, which imports the JS into the HTML right at the
// end of the body, its the last thing thats gonna be read in the HTML, so basically
// the browser will only find our script once the rest of the HMTL is already parsed
// anyway.
// => When the script is at the end of the HTML then we don't need to listen for
// the DOMContentLoaded event

// If you're coming to vanilla JS from jQuery then you're probably used to wrap your
// whole code into a document.ready function, which is equivalent to DOMContentLoaded
// in vanilla JS, but no such thing is necessary in vanilla JS
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// load
// the load event is fired by the window object as soon as not only the HTML is parsed
// but also all the images, and external resources like CSS files are also loaded
// when the complete page has finished loading, its when the load event gets fired
// both the DOMContentLoaded and the load times are shown at the bottom of the Network
// tab in the browser
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// beforeunload
// this event is created right before a user is about to leave a page, like after clicking
// the close tab (x) icon/button
// usually used if we want to ask the user if he really wants to leave the page
// in order to display a leaving confirmation we need to set the returnValue on the
// event to an empty string (weird, for historical reasons - a long time ago the developers
// were able to customize the message that was displayed when users tried to close a tab
// but it started to get abused so now we can only see a generic "Leave site?" message)
// it should not be abused and only used when the user is about to leave in the middle
// of completing a form application or writing a blog post
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
