import { Bee } from './bee';
import { Drone } from './drone';
import { Queen } from './queen';
import { Worker } from './worker';

export class BeeSwarm {
  bees: Bee[];

  constructor() {
    this.bees = this.createBeeSwarm();
  }

  createBeeSwarm(): Bee[] {
    const swarm = [] as Bee[];

    swarm.push(new Queen());

    for (let i = 0; i < 5; i++) {
      swarm.push(new Worker());
    }

    for (let i = 0; i < 10; i++) {
      swarm.push(new Drone());
    }

    return swarm;
  }

  attackSwarm(): { bee: Bee; damage: number } | null {
    if (this.isGameOver()) {
      return null;
    }

    const aliveBees = this.bees.filter(bee => bee.alive);
    const randomNumber = Math.floor(Math.random() * this.bees.length);
    const randomBee = aliveBees[randomNumber];
    randomBee.takeDamage();

    if (randomBee.type === 'Queen' && !randomBee.alive) {
      this.bees.forEach(bee => (bee.alive = false));
    }

    return { bee: randomBee, damage: randomBee.damage };
  }

  isGameOver(): boolean {
    const queenBee = this.bees.find(bee => bee.type === 'Queen') as Queen;
    if (queenBee && !queenBee.alive) {
      return true;
    }

    const areBeesDead = this.bees.every(bee => !bee.alive);
    return areBeesDead;
  }
}
