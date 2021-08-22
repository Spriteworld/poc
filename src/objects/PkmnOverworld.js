import {Character} from '@Objects';

export default class extends Character {
  constructor(config) {
    super(config);
  }

  update(time, delta) {
    if (this.ge.created === false) {
      return;
    }
    this.addAutoSpin(delta);
    this.addAutoMove();
    this.handleRun();
  }
}
