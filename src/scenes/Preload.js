import Phaser from 'phaser';
import {
  red,
  ace_trainer,
  gen3inside,
  gen3outside
} from '@Tileset';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
  }

  preload () {
    this.load.image('gen3_outside', gen3outside);
    this.load.image('gen3_inside', gen3inside);
    this.load.spritesheet('red', red, { frameWidth: 32, frameHeight: 40 });
    this.load.spritesheet('ace_trainer', ace_trainer, { frameWidth: 32, frameHeight: 42 });
  }

  create () {
    this.scene.start('UI');
    this.scene.run('Test');
    // this.scene.run('StarterTown');
  }
}
