const gameAreaElement = document.querySelector('.game-area');
const beeElement = document.querySelector('.bee');
const flowerElements = document.querySelectorAll('.flowers');

let beePosition = { x: 100, y: 100 };
beeElement.style.left = `${beePosition.x}px`;
beeElement.style.top = `${beePosition.y}px`;

for (let i = 0; i < 5; i++) {
  placeFlowers();
}

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

document.addEventListener('keydown', (event) => {
  const step = 20;

  switch(event.key) {
    case 'ArrowUp':
      
  }
});
