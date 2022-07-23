'use strict';

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`Accelerating, new speed is ${this.speed}`);
};

Car.prototype.break = function () {
  this.speed -= 5;
  console.log(`Breaking, new speed is ${this.speed}`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// A child class can overwrite a method it inherited from a parent class (polymorphism)
// In the EV.prototype we have the accelerate method, which overwrote the accelerate
// method inherited from Car.prototype
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge = (this.charge * 99) / 100;
  console.log(
    `Tesla going at ${this.speed} km/h with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);

tesla.chargeBattery(50);
console.log(tesla);

tesla.accelerate();
