import Phaser from 'phaser';
import {Character} from '@Objects';

export default class extends Character {
  constructor(config) {
    super(config);
  }

  update(time, delta) {
    if (this.ge.created === false) { return; }
    this.handleAutoMoveTiles();

    if (this.config.scene.scene.get('Preload').enableOWPokemon) {
      this.addAutoSpin(delta);
      this.addAutoMove();
      this.handleRun();
    }
  }
}
