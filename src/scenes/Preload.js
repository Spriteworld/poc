import Phaser from 'phaser';
import {gen3inside, gen3outside, frlgPlayer, frlg_outside2} from '@Tileset';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
  }

  preload () {
    this.load.image('gen3_outside', gen3outside);
    this.load.image('gen3_inside', gen3inside);
    this.load.image('frlg_outside2', frlg_outside2);
    this.load.spritesheet('red', frlgPlayer, { frameWidth: 24, frameHeight: 32 });
  }

  create () {
    console.log('Preload::create');
    this.scene.start('UI');
    this.scene.run('Test');
    // this.scene.run('StarterTown');
  }
}
