import Phaser from 'phaser';
import {
  // tilesets
  gen3inside,
  gen3outside,
  // characters
  red,
  ace_trainer,
  poke_kid,
  pokemon,
  // pokemon_shiny,
  // pokemon_home
} from '@Tileset';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
  }

  preload () {
    var progress = this.add.graphics();

    this.load.on('progress', function (value) {
        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);
    });

    this.load.on('complete', function () {
        progress.destroy();
    });

    this.load.image('gen3_outside', gen3outside);
    this.load.image('gen3_inside', gen3inside);
    this.load.spritesheet('red', red, { frameWidth: 32, frameHeight: 40 });
    this.load.spritesheet('ace_trainer', ace_trainer, { frameWidth: 32, frameHeight: 42 });
    this.load.spritesheet('poke_kid', poke_kid, { frameWidth: 32, frameHeight: 42 });

    Object.keys(pokemon).forEach((name) => {
      this.load.spritesheet(name, pokemon[name]
        , { frameWidth: 64, frameHeight: 64 });
    });
    // Object.keys(pokemon_shiny).forEach((name) => {
    //   this.load.spritesheet(name, pokemon_shiny[name]
    //     , { frameWidth: 64, frameHeight: 64 });
    // });
    // Object.keys(pokemon_home).forEach((name) => {
    //   this.load.image(name, pokemon_home[name]);
    // });

  }

  create () {
    this.scene.start('UI');
    this.scene.start('Test');


    // let umbreon = {
    //   pid: 1,
    //   nickname: 'Umbreon',
    //   species: 197,
    //   speciesName: 'umbreon',
    //   hp: {
    //     max: 29,
    //     current: 29
    //   },
    //   moves: [{
    //     name: 'Tackle',
    //     pp: {
    //       max: 10,
    //       current: 10
    //     },
    //   }],
    //   ivs: {
    //     atk: 5,
    //     def: 5,
    //     spd: 5,
    //     spatk: 5,
    //     spdef: 5,
    //     hp: 5
    //   },
    //   evs: {
    //     atk: 5,
    //     def: 5,
    //     spd: 5,
    //     spatk: 5,
    //     spdef: 5,
    //     hp: 5
    //   },
    //   exp: 0,
    //   isShiny: false,
    // };

    // this.scene.start('BattleScene', {
    //   player: {
    //     team: [
    //       umbreon
    //     ]
    //   },
    //   enemy: {
    //     team: [
    //       umbreon
    //     ]
    //   }
    // });
  }
}
