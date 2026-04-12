export default class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  static get [Symbol.species]() {
    return this;
  }

  cloneCar() {
    // Return a new instance of the same class (via Symbol.species)
    return new this.constructor[Symbol.species]();
  }
}

