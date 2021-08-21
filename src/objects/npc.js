import {Character} from '@Objects';

export default class extends Character {
  constructor(config) {
    super(config);
    this.spinRate = this.config.spinRate || 600;
    this.spinTimer = 0;

    this.config.scene.gridEngine.addCharacter(
      this.characterDef(this.config)
    );
  }

  update(time, delta) {
    if (this.config.spin) {
      this.setSpinner(delta, this.spinRate);
    }
    if (this.config.move === 'random') {
      this.config.scene.gridEngine.moveRandomly(this.config.id, 250, 1);
    }
  }

  setSpinner(delta, spinRate) {
    this.spinRate -= delta;
    if (this.spinRate < 0) {
      this.spinRate = this.config.spinRate;

      let dir = 'down';
      switch (Math.floor(Math.random() * 4) +1) {
        case 1: dir = 'up'; break;
        case 2: dir = 'down'; break;
        case 3: dir = 'left'; break;
        case 4: dir = 'right'; break;
      }
      this.look(dir);
    }
  }
}
