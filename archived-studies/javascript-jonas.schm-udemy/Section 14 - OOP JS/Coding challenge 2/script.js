'use strict';

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`Accelerating, new speed is ${this.speed} 🚗`);
  }

  break() {
    this.speed -= 5;
    console.log(`Breaking, new speed is ${this.speed} 🚗`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }
}

const ford = new CarCl('ford', 120);
console.log(ford);
console.log(ford.speedUS); // 75
console.log(ford.speed); // 120

class CarCl2 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  set fastUS(x) {
    this.speed = x * 1.6;
  }
}

const bmw = new CarCl2('bmw', 140);
console.log(bmw);

// 100 is the passed parameter into fastUS (x)
// this setter, presumably takes a speed in in m/h and sets the new speed in km/h
bmw.fastUS = 100;
console.log(bmw);
