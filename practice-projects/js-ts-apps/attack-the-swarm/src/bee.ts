export abstract class Bee {
  hp: number;
  maxHP: number;
  damage: number;
  alive: boolean;
  type: string;

  constructor(type: string, hp: number, damage: number) {
    this.type = type;
    this.hp = hp;
    this.maxHP = hp;
    this.damage = damage;
    this.alive = true;
  }

  takeDamage() {
    if (!this.alive) {
      return;
    }

    this.hp -= this.damage;

    if (this.hp <= 0) {
      this.hp = 0;
      this.alive = false;
    }
  }
}
