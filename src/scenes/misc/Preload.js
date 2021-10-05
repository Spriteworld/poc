import Phaser from 'phaser';
import * as Tileset from '@Tileset';
import { STATS } from '@pokelinkapp/pokemon-data/';
import { NATURES, BasePokemon } from '@pokelinkapp/pokemon-data/src/pokemon';

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

    let pokemon1 = new BasePokemon({
      pid: 1,
      originalTrainer: 'xLink',
      nickname: 'Bulbasaur',
      species: 1,
      level: 5,
      nature: NATURES.HARDY,
      currentHp: 10,
      moves: [{
        name: 'Tackle',
        damage: 2,
        pp: {
          max: 10,
          current: 10
        },
      },{
        name: 'Razor Leaf',
        damage: 2,
        pp: {
          max: 5,
          current: 5
        },
      }],
      ivs: {
        [STATS.HP]: 5,
        [STATS.ATTACK]: 5,
        [STATS.DEFENSE]: 5,
        [STATS.SPECIAL_ATTACK]: 5,
        [STATS.SPECIAL_DEFENSE]: 5,
        [STATS.SPEED]: 5,
      },
      evs: {
        [STATS.HP]: 5,
        [STATS.ATTACK]: 5,
        [STATS.DEFENSE]: 5,
        [STATS.SPECIAL_ATTACK]: 5,
        [STATS.SPECIAL_DEFENSE]: 5,
        [STATS.SPEED]: 5,
      },
      exp: 0,
      isShiny: false,
    });

    let pokemon2 = new BasePokemon({
      pid: 1,
      originalTrainer: 'Trainer',
      nickname: 'Sparky',
      species: 25,
      level: 5,
      nature: NATURES.HARDY,
      currentHp: 10,
      moves: [{
        name: 'Tackle',
        damage: 2,
        pp: {
          max: 10,
          current: 10
        },
      },{
        name: 'ThunderBolt',
        damage: 6,
        pp: {
          max: 10,
          current: 10
        },
      }],
      ivs: {
        [STATS.HP]: 5,
        [STATS.ATTACK]: 5,
        [STATS.DEFENSE]: 5,
        [STATS.SPECIAL_ATTACK]: 5,
        [STATS.SPECIAL_DEFENSE]: 5,
        [STATS.SPEED]: 5,
      },
      evs: {
        [STATS.HP]: 5,
        [STATS.ATTACK]: 5,
        [STATS.DEFENSE]: 5,
        [STATS.SPECIAL_ATTACK]: 5,
        [STATS.SPECIAL_DEFENSE]: 5,
        [STATS.SPEED]: 5,
      },
      exp: 0,
      isShiny: false,
    });

    let player = {
      name: 'xLink',
      team: [{...pokemon1}]
    };

    let enemy = {
      name: 'Trainer',
      team: [{...pokemon2}]
    };

    return {player, enemy}
  }
}
