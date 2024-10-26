const gameArea = document.querySelector('.game-area');
const bee = document.querySelector('.bee');

function eatFlower() {
  const flowers = document.querySelectorAll('.flower');

  for (let i = 0; i < flowers.length; i++) {
    const flowerX = Number(flowers[i].style.left.slice(0, -2));
    const flowerY = Number(flowers[i].style.top.slice(0, -2));

    const flowerWidth = flowers[i].offsetWidth;
    const flowerHeight = flowers[i].offsetHeight;

    // Bee's edges
    const beeLeft = beePosition.x;
    const beeRight = beePosition.x + bee.offsetWidth;
    const beeTop = beePosition.y;
    const beeBottom = beePosition.y + bee.offsetHeight;

    // Flower's edges
    const flowerLeft = flowerX;
    const flowerRight = flowerX + flowerWidth;
    const flowerTop = flowerY;
    const flowerBottom = flowerY + flowerHeight;

    const isColliding =
      beeRight > flowerLeft && // Bee's right edge passes the flower's left edge
      beeLeft < flowerRight && // Bee's left edge is before the flower's right edge
      beeBottom > flowerTop && // Bee's bottom edge is below the flower's top edge
      beeTop < flowerBottom; // Bee's top edge is above the flower's bottom edge

    if (isColliding) {
      flowers[i].style.display = 'none'; // Hide the flower
    }
  }
}

function keepBeeInBounds() {
  const beeWidth = bee.offsetWidth;
  const beeHeight = bee.offsetHeight;

  if (beePosition.x < 0) beePosition.x = 0;
  if (beePosition.x > gameArea.offsetWidth - beeWidth) {
    beePosition.x = gameArea.offsetWidth - beeWidth;
  }

  if (beePosition.y < 0) beePosition.y = 0;
  if (beePosition.y > gameArea.offsetHeight - beeHeight) {
    beePosition.y = gameArea.offsetHeight - beeHeight;
  }
}

function placeFlower() {
  const flower = document.createElement('div');
  flower.classList.add('flower');

  const x = Math.floor(Math.random() * (gameArea.offsetWidth - 30));
  const y = Math.floor(Math.random() * (gameArea.offsetHeight - 30));

  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;

  gameArea.appendChild(flower);
}

for (let i = 0; i < 5; i++) {
  placeFlower();
}

let beePosition = { x: 100, y: 100 };

bee.style.left = `${beePosition.x}px`;
bee.style.top = `${beePosition.y}px`;

document.addEventListener('keydown', event => {
  const step = 20;

  switch (event.key) {
    case 'ArrowUp':
      beePosition.y -= step;
      break;

    case 'ArrowDown':
      beePosition.y += step;
      break;

    case 'ArrowRight':
      beePosition.x += step;
      break;

    case 'ArrowLeft':
      beePosition.x -= step;
      break;
  }

  keepBeeInBounds();

  eatFlower();

  bee.style.left = `${beePosition.x}px`;
  bee.style.top = `${beePosition.y}px`;
});
