import { Bee } from './bee';

export class Worker extends Bee {
  constructor() {
    super('Worker', 75, 10);
  }
}
