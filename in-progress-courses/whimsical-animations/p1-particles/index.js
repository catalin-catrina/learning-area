import { random, range } from "lodash";
import "./styles.css";

// Lesson
const FADE_DURATION = 1000;

const btn = document.querySelector(".particleButton");

btn.addEventListener("click", () => {
  btn.classList.toggle("liked");

  const isLiked = btn.classList.contains("liked");

  // Bail out early if the user is *undoing* their like.
  // No particles in this case.
  if (!isLiked) {
    return;
  }

  const particles = [];

  range(5).forEach(() => {
    const particle = document.createElement("span");
    particle.classList.add("particle");
    particles.push(particle);

    particle.style.top = random(0, 100) + "%";
    particle.style.left = random(0, 100) + "%";
    particle.style.animationDuration = FADE_DURATION + "ms";

    btn.appendChild(particle);
  });

  particles.forEach((particle) => {
    setTimeout(() => {
      particle.remove();
    }, FADE_DURATION + 200);
  });
});

// Exercises
// Starry Night
const exerciseBtn = document.querySelector(".particleButtonEx");

exerciseBtn.addEventListener("click", () => {
  // TODO: Generate stars on click!
  // Here’s the emoji to use: ⭐
  range(9).forEach((star) => {
    const starEl = document.createElement("span");
    const starLayerEl = document.querySelector(".starLayer");
    starEl.classList.add("star");
    starEl.innerText = "⭐";

    starEl.style.position = "absolute";
    starEl.style.top = random(0, 100) + "%";
    starEl.style.left = random(0, 100) + "%";

    starEl.addEventListener("animationend", () => {
      starEl.remove();
    });
    starLayerEl.appendChild(starEl);
  });
});

/*
  DOM manipulation cheatsheet:
  
  - Select an element:
    `document.querySelector('.someCssSelector');`
  - Create new elements:
    `document.createElement('tagName');`
  - Add a CSS class:
    `element.classList.add('className');`
  - Add the element to the DOM:
    `parentNode.appendChild(childNode);`
  - Add text to a node:
    `element.innerText = "Stuff";`
*/

// Shimmer Particle
const buyBtn = document.querySelector(".buyButton");

function generateShimmer() {
  const shimmer = document.createElement("span");
  shimmer.classList.add("shimmer");

  buyBtn.appendChild(shimmer);

  shimmer.addEventListener("animationend", () => {
    shimmer.remove();
  });
}

buyBtn.addEventListener("mouseenter", generateShimmer);
buyBtn.addEventListener("focus", generateShimmer);
