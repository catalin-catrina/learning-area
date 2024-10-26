const gameAreaElement = document.querySelector('.game-area');
const beeElement = document.querySelector('.bee');
let flowerElements = document.querySelectorAll('.flower');

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

document.addEventListener('keydown', event => {
  const step = 20;

  switch (event.key) {
    case 'ArrowUp':
      beePosition.y -= step;
      break;
    case 'ArrowRight':
      beePosition.x += step;
      break;
    case 'ArrowDown':
      beePosition.y += step;
      break;
    case 'ArrowLeft':
      beePosition.x -= step;
      break;
  }

  keepInBounds();

  beeElement.style.left = `${beePosition.x}px`;
  beeElement.style.top = `${beePosition.y}px`;

  eatFlowers();
});

function placeFlowers() {
  const flowerElement = document.createElement('div');
  gameAreaElement.appendChild(flowerElement);
  flowerElement.classList.add('flower');

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

function eatFlowers() {
  const beeBoundaries = {
    top: beePosition.x,
    left: beePosition.y,
    right: beePosition.x + beeSize.width,
    bottom: beePosition.y + beeSize.height,
  };

  flowerElements = document.querySelectorAll('.flower');

  flowerElements.forEach(flower => {
    const flowerPosition = {
      x: Number(flower.style.top.slice(0, -2)),
      y: Number(flower.style.left.slice(0, -2)),
    };

    const flowerSize = {
      width: flower.offsetWidth,
      height: flower.offsetHeight,
    };

    const flowerBoundaries = {
      top: flowerPosition.x,
      left: flowerPosition.y,
      right: flowerPosition.x + flowerSize.width,
      bottom: flowerPosition.y + flowerSize.height,
    };

    if (
      beeBoundaries.top <= flowerBoundaries.bottom &&
      beeBoundaries.left <= flowerBoundaries.right &&
      beeBoundaries.right >= flowerBoundaries.left &&
      beeBoundaries.bottom >= flowerBoundaries.top
    ) {
      flower.style.display = 'none';
    }
  });
}
