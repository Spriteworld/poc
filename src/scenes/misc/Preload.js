import Phaser from 'phaser';
import * as Tileset from '@Tileset';
import { GROWTH, NATURES, BasePokemon } from '@pokelinkapp/pokemon-data/src/pokemon';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
  }

  preload () {
    // this.load.scripts('inspector', [
    //   'https://cdn.jsdelivr.net/npm/tweakpane@3.0.5',
    //   'https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@1.0.1',
    // ]);
    // this.load.once('complete', () => {
    //   PhaserPluginInspector.Install(this.plugins);
    // });

    var progress = this.add.graphics();

    this.load.on('progress', function (value) {
        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);
    });

    this.load.on('complete', function () {
        progress.destroy();
    });

    this.load.image('gen3_inside', Tileset.gen3inside);
    this.load.image('gen3_outside', Tileset.gen3outside);
    this.load.image('rse_inside', Tileset.rseinside);
    this.load.image('rse_outside', Tileset.rseoutside);
    this.load.spritesheet('red', Tileset.red, { frameWidth: 32, frameHeight: 40 });
    Object.keys(Tileset.trainers).forEach((name) => {
      this.load.spritesheet(name, Tileset.trainers[name]
        , { frameWidth: 32, frameHeight: 42 });
    });

    Object.keys(Tileset.pokemon).forEach((name) => {
      this.load.spritesheet(name, Tileset.pokemon[name]
        , { frameWidth: 64, frameHeight: 64 });
    });
    Object.keys(Tileset.pokemon_shiny).forEach((name) => {
      this.load.spritesheet(name, Tileset.pokemon_shiny[name]
        , { frameWidth: 64, frameHeight: 64 });
    });
    // Object.keys(Tileset.pokemon_home).forEach((name) => {
    //   this.load.image(name, Tileset.pokemon_home[name]);
    // });

  }

  create () {
    let load = 'overworld';
    if (load === 'overworld') {
      this.scene.start('Test');
      this.scene.start('OverworldUI');
      this.scene.bringToTop('OverworldUI');
    } else {
      this.scene.start('BattleScene', this.battleData());
    }
  }

  battleData() {

    let umbreon = new BasePokemon({
      pid: 1,
      originalTrainer: '',
      nickname: 'Umbreon',
      species: 197,
      speciesName: 'umbreon',
      level: 5,
      growth: GROWTH.MEDIUM_FAST,
      nature: NATURES.HARDY,
      currentHp: 10,
      moves: [{
        name: 'Tackle',
        damage: 2,
        pp: {
          max: 10,
          current: 10
        },
      }],
      baseStats: {
        hp: 95,
        atk: 65,
        def: 110,
        spatk: 60,
        spdef: 130,
        spd: 65,
      },
      ivs: {
        hp: 5,
        atk: 5,
        def: 5,
        spatk: 5,
        spdef: 5,
        spd: 5,
      },
      evs: {
        hp: 5,
        atk: 5,
        def: 5,
        spatk: 5,
        spdef: 5,
        spd: 5,
      },
      exp: 0,
      isShiny: false,
    });

    let pikachu = new BasePokemon({
      pid: 1,
      originalTrainer: '',
      nickname: 'Sparky',
      species: 25,
      speciesName: 'pikachu',
      level: 5,
      growth: GROWTH.MEDIUM_FAST,
      nature: NATURES.HARDY,
      currentHp: 10,
      moves: [{
        name: 'Tackle',
        damage: 2,
        pp: {
          max: 10,
          current: 10
        },
      }],
      baseStats: {
        hp: 35,
        atk: 55,
        def: 40,
        spatk: 50,
        spdef: 50,
        spd: 90,
      },
      ivs: {
        hp: 5,
        atk: 5,
        def: 5,
        spatk: 5,
        spdef: 5,
        spd: 5,
      },
      evs: {
        hp: 5,
        atk: 5,
        def: 5,
        spatk: 5,
        spdef: 5,
        spd: 5,
      },
      exp: 0,
      isShiny: false,
    });

    umbreon.originalTrainer = 'xLink';
    umbreon.nickname = 'Luna';
    let player = {
      name: 'xLink',
      team: [{...umbreon}]
    };

    pikachu.originalTrainer = 'Trainer';
    pikachu.nickname = 'Sparky';
    let enemy = {
      name: 'Trainer',
      team: [{...pikachu}]
    };

    return {player, enemy}
  }
}
