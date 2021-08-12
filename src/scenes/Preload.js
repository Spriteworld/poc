import Phaser from 'phaser';
import {gen3inside, gen3outside} from '@Tileset';
import {player as red} from '@Tileset';

export default class Preload extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
    console.log('loaded preload');
  }

  preload () {
    console.log('loaded preload::preload');
    this.load.image('gen3_outside', gen3outside);
    this.load.image('gen3_inside', gen3inside);
    this.load.spritesheet('red', red, { frameWidth: 32, frameHeight: 40 });
  }

  create () {
    console.log('loaded preload::create');
    this.scene.run('Test');
  }
}
