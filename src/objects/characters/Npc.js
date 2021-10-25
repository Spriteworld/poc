import Phaser from 'phaser';
import {Character} from '@Objects';

export default class extends Character {
  constructor(config) {
    config.type = 'npc';
    super(config);
  }

  update(time, delta) {
    if (this.ge.created === false) { return; }
    this.handleAutoMoveTiles();
    this.addAutoSpin(delta);
    this.addAutoMove();
    this.canSeeCharacter();
  }
}
