import Phaser from 'phaser';
import {
  // tilesets
  gen3inside,
  gen3outside,
  // characters
  red,
  ace_trainer,
  poke_kid,
  pokemon
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
    this.load.spritesheet('poke_kid', poke_kid, { frameWidth: 32, frameHeight: 42 });

    Object.keys(pokemon).forEach((name) => {
      this.load.spritesheet(name, pokemon[name]
        , { frameWidth: 64, frameHeight: 64 });
    });

  }

  create () {
    this.scene.start('UI');
    this.scene.run('Test');
  }
}
