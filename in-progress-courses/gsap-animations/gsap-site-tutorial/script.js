document.addEventListener("DOMContentLoaded", (event) => {
  // GSAP TO
  // first parameter can be selector text, a variable, an object, or an array - it uses DOM's querySelectorAll behind the scenes
  // use a class or ID
  // gsap.to(".box", { x: 200 });

  // a complex CSS selector
  // gsap.to("section > .box", { x: 200 });

  // a variable
  // let box = document.querySelector(".box");
  // gsap.to(box, { x: 200 });

  // or even an Array of elements
  // let square = document.querySelector(".square");
  // let circle = document.querySelector(".circle");
  // gsap.to([square, circle], { x: 200 });

  // second parameter is a configuration object
  // we call this animation a tween because it animates between states
  // x is just a shortcut for the translateX css transform
  // special properties you can pass into the configuration object, other than CSS properties, are duration, delay, and especially ease
  //   gsap.to(".logo", {
  //     duration: 2,
  //     x: 300,
  //     backgroundColor: "#560563",
  //     borderRadius: "20%",
  //     border: "5px solid #fff",
  //     ease: "bounce",
  //   });
  // GSAP SET
  // immediately sets properties, essentially a zero-duration .to() tween
  // we use set transformOrigin 50% 50% to animate these svgs around their centers
  //   gsap.set(".logo, .astronaut", { transformOrigin: "50% 50%" });
  //   gsap.to(".logo, .astronaut", { duration: 2, rotation: 360 });
  // we can animate a js object as well
  // for example we update the rotation property from 0 to 360 over the course of 10 seconds
  // as its not an object on screen, we cant see whats happening on screen so we pass an onUpdate function which runs every time the animation updates
  // there's also onStart and onComplete which run when a tween starts or completes
  //   let myObj = { rotation: 0 };
  //   gsap.to(myObj, {
  //     duration: 10,
  //     rotation: 360,
  //     onUpdate: function () {
  //       console.log(myObj.rotation);
  //     },
  //   });

  // GSAP FROM
  // animating from a set a values to the default
  // usually used to animate elements when page loads
  // stagger is the value in seconds between when the animation starts for each of the selected elements
  //   let tween = gsap.from(".circle", {
  //     duration: 1.5,
  //     opacity: 0,
  //     // y can also take a function as a value, like:
  //     // y: Math.random() * 400 - 200
  //     // since random values are so common, gsap has a built in method for this, in this case it generates a random y value between -200 and 200
  //     // y: "random(-200, 200)"
  //     y: 100,
  //     ease: "back",
  //     stagger: 0.25,
  //   });

  // GSAP FROMTO
  // animate from a position to another
  // gsap.fromTo( ".circle",{ x: -40, fill: 'blue', }, { x: 40, fill: 'green' });

  // Control methods
  // we can store the tween in a variable and then get access to some methods that allow us to control its behavior
  // play the animation
  //   document.querySelector(".play").addEventListener("click", () => {
  //     tween.play();
  //   });

  // pause the animation
  //   document.querySelector(".pause").addEventListener("click", () => {
  //     tween.pause();
  //   });

  // go to second 2 in the animation
  //   document.querySelector(".seek").addEventListener("click", () => {
  //     tween.seek(2);
  //   });

  // go to 20% progress
  //   document.querySelector(".progress").addEventListener("click", () => {
  //     tween.progress(0.2);
  //     sequenceUpdateDragger();
  //   });

  // reverse it
  //   document.querySelector(".reverse").addEventListener("click", () => {
  //     tween.reverse();
  //   });

  // speed it up
  //   document.querySelector(".time4").addEventListener("click", () => {
  //     tween.timeScale(4);
  //   });

  // slow it down
  //   document.querySelector(".time2").addEventListener("click", () => {
  //     tween.timeScale(0.2);
  //   });

  // Sequencing
  // we can delay the start of an animation through the "delay" property of the configuration object, delaying the second animation with the value of the duration of the first animation - but for complex animations this becomes hard if not impossible to manage, cause if we change the duration of an animation, we'd have to change the delay of all animations that depend on it
  //   gsap.from(".logo", { duration: 1.5, opacity: 0, scale: 0.3, ease: "back" });
  //   gsap.from(".circle", {
  //     duration: 1,
  //     opacity: 0,
  //     delay: 1.5,
  //     y: 150,
  //     stagger: 0.25,
  //   });

  // the better option is to create a timeline, then all animations added to that timeline run in the order they were declared
  // tweens in timelines can take a third parameter, their position in the animation, which can be expressed as an absolute value like 4 (that will be the 4th animation that runs) or a relative value (based on the tween that comes before it) like a "+=2" which would make it run 2 seconds after, or "-=1" which would make it run one second before
  // timelines can also contain other timelines, to modularize your app
  // timelines can also contain labels, to reference that point in the animation in other tweens and to adjust timings between animations. a label does nothing by itself, it can literally be even just a string with a name, like start
  // the timeline method can take a configuration object parameter, with properties like repeat - which indicates how manytimes the timeline should repeat, and yoyo, which makes the animation go backwards after it finishes
  // const tl = gsap.timeline({ repeat: 1, yoyo: true });

  // tl.addLabel("start");
  // tl.from(".logo", { duration: 1.5, opacity: 0, scale: 0.3, ease: "back" });
  // tl.from(
  //   ".circle",
  //   {
  //     duration: 1,
  //     opacity: 0,
  //     y: 150,
  //     stagger: 0.25,
  //   },
  //   "+=1"
  // );
  // tl.addLabel("circlesOutro", "+=1");
  // tl.to(
  //   ".circle",
  //   { duration: 0.5, opacity: 0, x: 300, ease: "power3.out" },
  //   "circlesOutro"
  // );

  // Animating SVGs
  gsap.to(".svgBox", {
    duration: 2,
    // (this is now using SVG units not px, the SVG viewBox is 100 units wide)
    x: 100,
    xPercent: -100,
    // target SVG attributes
    attr: {
      fill: "#8d3dae",
      rx: 50,
    },
  });
});
