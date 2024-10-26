const gameAreaElement = document.querySelector(".game-area");
const beeElement = document.querySelector(".bee");
const flowerElements = document.querySelectorAll(".flowers");

let beePosition = { x: 100, y: 100 };

const beeSize = {
  width: beeElement.offsetWidth,
  height: beeElement.offsetHeight,
};
const gameSize = {
  width: gameAreaElement.offsetWidth,
  height: gameAreaElement.offsetHeight,
};

beeElement.style.left = `${beePosition.x}px`;
beeElement.style.top = `${beePosition.y}px`;

for (let i = 0; i < 5; i++) {
  placeFlowers();
}

document.addEventListener("keydown", (event) => {
  const step = 20;

  switch (event.key) {
    case "ArrowUp":
      beePosition.y -= step;
      break;
    case "ArrowRight":
      beePosition.x += step;
      break;
    case "ArrowDown":
      beePosition.y += step;
      break;
    case "ArrowLeft":
      beePosition.x -= step;
      break;
  }

  keepInBounds();

  beeElement.style.left = `${beePosition.x}px`;
  beeElement.style.top = `${beePosition.y}px`;
});

function placeFlowers() {
  const flowerElement = document.createElement("div");
  gameAreaElement.appendChild(flowerElement);
  flowerElement.classList.add("flower");

  const flowerX = Math.floor(
    Math.random() * (gameAreaElement.offsetWidth - 30)
  );
  const flowerY = Math.floor(
    Math.random() * (gameAreaElement.offsetHeight - 30)
  );

  flowerElement.style.left = `${flowerX}px`;
  flowerElement.style.top = `${flowerY}px`;
}

function keepInBounds() {
  if (beePosition.x < 0) beePosition.x = 0;
  if (beePosition.x > gameSize.width - beeSize.width)
    beePosition.x = gameSize.width - beeSize.width;
  if (beePosition.y < 0) beePosition.y = 0;
  if (beePosition.y > gameSize.height - beeSize.height)
    beePosition.y = gameSize.height - beeSize.height;
}

function eatFlowers() {}
