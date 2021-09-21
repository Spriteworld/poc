import Phaser from 'phaser';
import {
  // tilesets
  gen3inside,
  gen3outside,
  rseinside,
  rseoutside,

  // characters
  red,
  trainers,

  // pokemon
  pokemon,
  pokemon_shiny,
  // pokemon_home
} from '@Tileset';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
  }

  preload () {
    this.load.scripts('inspector', [
      'https://cdn.jsdelivr.net/npm/tweakpane@3.0.5',
      'https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@1.0.1',
    ]);
    this.load.once('complete', () => {
      PhaserPluginInspector.Install(this.plugins);
    });

    var progress = this.add.graphics();

    this.load.on('progress', function (value) {
        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);
    });

    this.load.on('complete', function () {
        progress.destroy();
    });

    this.load.image('gen3_inside', gen3inside);
    this.load.image('gen3_outside', gen3outside);
    this.load.image('rse_inside', rseinside);
    this.load.image('rse_outside', rseoutside);
    this.load.spritesheet('red', red, { frameWidth: 32, frameHeight: 40 });
    Object.keys(trainers).forEach((name) => {
      this.load.spritesheet(name, trainers[name]
        , { frameWidth: 32, frameHeight: 42 });
    });

    Object.keys(pokemon).forEach((name) => {
      this.load.spritesheet(name, pokemon[name]
        , { frameWidth: 64, frameHeight: 64 });
    });
    Object.keys(pokemon_shiny).forEach((name) => {
      this.load.spritesheet(name, pokemon_shiny[name]
        , { frameWidth: 64, frameHeight: 64 });
    });
    // Object.keys(pokemon_home).forEach((name) => {
    //   this.load.image(name, pokemon_home[name]);
    // });

  }

  create () {
    this.scene.start('Test');
    this.scene.start('UI');
    this.scene.bringToTop('UI');

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
