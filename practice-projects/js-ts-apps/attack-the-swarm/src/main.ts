import { Bee } from './bee';
import { BeeSwarm } from './beeSwarm';

class Game {
  playerName: string;
  beeSwarm: BeeSwarm;

  constructor(playerName: string) {
    this.playerName = playerName;
    this.beeSwarm = new BeeSwarm();

    console.log(this.beeSwarm);

    this.addEventListeners();
    this.renderUI();
  }

  private addEventListeners(): void {
    const attackButton = document.querySelector(
      '.attack-bees'
    ) as HTMLButtonElement;
    const resetButton = document.querySelector(
      '.reset-game'
    ) as HTMLButtonElement;

    attackButton.addEventListener('click', () => this.attackSwarm());
    resetButton.addEventListener('click', () => this.resetGame);
  }

  attackSwarm() {
    const attack = this.beeSwarm.attackSwarm();
    if (attack) {
      const bee = attack.bee;
      const damage = attack.damage;

      this.showAttackDetails(bee, damage);
      this.renderUI();
    }
  }

  showAttackDetails(bee: Bee, damage: number) {
    const attackDetailsEl = document.querySelector(
      '.attack-details'
    ) as HTMLElement;
    attackDetailsEl.textContent = `Hit a ${bee.type} for ${damage} damage`;
  }

  renderUI() {
    const beesContainerEl = document.querySelector(
      '.bees-container'
    ) as HTMLElement;
    beesContainerEl.textContent = '';

    const aliveBees = this.beeSwarm.bees.filter(bee => bee.alive);
    const beeTypes = ['Queen', 'Worker', 'Drone'];

    beeTypes.forEach(type => {
      const beesOfType = aliveBees.filter(bee => bee.type === type);
      const typeEl = document.createElement('div') as HTMLElement;

      beesOfType.forEach(bee => {
        const beeEl = document.createElement('div') as HTMLElement;
        beeEl.classList.add(type);
        beeEl.textContent = `${bee.type} - ${bee.hp} / ${bee.maxHP}`;
        typeEl.appendChild(beeEl);
      });

      beesContainerEl.appendChild(typeEl);
    });
  }

  resetGame() {}
}

window.onload = () => {
  const game = new Game('Leo');
};
