'use strict';

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  break() {
    this.speed -= 10;
    return this;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `Tesla going at ${this.speed} km/h with a charge of ${this.#charge}`
    );
    return this;
  }
}

const rivian = new EVCl('rivian', 120, 23);

rivian.chargeBattery(100).accelerate().break().break().break().accelerate();
