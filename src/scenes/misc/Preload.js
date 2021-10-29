import Phaser from 'phaser';
import { Tile } from '@Objects';
import * as Tileset from '@Tileset';
import { STATS, NATURES, BasePokemon } from '@pokelinkapp/pokemon-data';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });

    this.loadOverworld = true;
    this.enableOWTrainers = true;
    this.enableOWPokemon = true;
    this.enablePlayerOWPokemon = true;
    this.enableAnimations = true;
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

    this.load.image('blank', Tileset.blank);
    this.load.image('gen3_inside', Tileset.gen3inside);
    this.load.image('gen3_outside', Tileset.gen3outside);
    this.load.image('rse_inside', Tileset.rseinside);
    this.load.image('rse_outside', Tileset.rseoutside);
    this.load.spritesheet('red', Tileset.red, { frameWidth: Tile.WIDTH, frameHeight: 40 });

    if (this.loadOverworld) {
      if (this.enableOWTrainers) {
        Object.keys(Tileset.trainers).forEach((name) => {
          this.load.spritesheet(name, Tileset.trainers[name]
            , { frameWidth: Tile.WIDTH, frameHeight: 42 });
        });
      }
      if (this.enableOWPokemon) {
        Object.keys(Tileset.pokemon).forEach((name) => {
          this.load.spritesheet(name, Tileset.pokemon[name]
            , { frameWidth: 64, frameHeight: 64 });
        });
        Object.keys(Tileset.pokemon_shiny).forEach((name) => {
          this.load.spritesheet(name, Tileset.pokemon_shiny[name]
            , { frameWidth: 64, frameHeight: 64 });
        });
      }
    } else {
      // Object.keys(Tileset.pokemon_home).forEach((name) => {
      //   this.load.image(name, Tileset.pokemon_home[name]);
      // });
    }

  }

  create () {
    if (this.loadOverworld) {
      this.scene.start('Test');
      this.scene.start('TimeOverlay');
      this.scene.bringToTop('TimeOverlay');
      this.scene.start('OverworldUI');
      this.scene.bringToTop('OverworldUI');
      this.createAnimations();
    } else {
      this.scene.start('BattleScene', this.battleData());
    }

  }

  createAnimations() {
    if (this.enableOWTrainers) {
      Object.keys(Tileset.trainers).forEach((name) => {
        this.anims.create({
          key: name+'-spin',
          frames: this.anims.generateFrameNumbers(name, { frames: [0, 4, 12, 8] }),
          frameRate: 7,
          repeat: -1
        });
      });
    }
    if (this.enableOWPokemon) {
      Object.keys(Tileset.pokemon).forEach((name) => {
        this.anims.create({
          key: name+'-spin',
          frames: this.anims.generateFrameNumbers(name, { frames: [0, 4, 12, 8] }),
          frameRate: 7,
          repeat: -1
        });
      });
      Object.keys(Tileset.pokemon_shiny).forEach((name) => {
        this.anims.create({
          key: name+'-spin',
          frames: this.anims.generateFrameNumbers(name, { frames: [0, 4, 12, 8] }),
          frameRate: 7,
          repeat: -1
        });
      });
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
      ability: {
        name: 'none',
      },
      currentHp: 10,
      moves: [{
        name: 'Tackle',
        pp: {
          max: 10,
          current: 10
        },
      },{
        name: 'Razor Leaf',
        pp: {
          max: 5,
          current: 5
        },
      }],
      ivs: {
        [STATS.HP]: 31,
        [STATS.ATTACK]: 31,
        [STATS.DEFENSE]: 31,
        [STATS.SPECIAL_ATTACK]: 31,
        [STATS.SPECIAL_DEFENSE]: 31,
        [STATS.SPEED]: 31,
      },
      evs: {
        [STATS.HP]: 4,
        [STATS.ATTACK]: 0,
        [STATS.DEFENSE]: 4,
        [STATS.SPECIAL_ATTACK]: 5,
        [STATS.SPECIAL_DEFENSE]: 6,
        [STATS.SPEED]: 0,
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
      ability: {
        name: 'none',
      },
      currentHp: 10,
      moves: [{
        name: 'Tackle',
        pp: {
          max: 10,
          current: 10
        },
      },{
        name: 'ThunderBolt',
        pp: {
          max: 10,
          current: 10
        },
      }],
      ivs: {
        [STATS.HP]: 31,
        [STATS.ATTACK]: 31,
        [STATS.DEFENSE]: 31,
        [STATS.SPECIAL_ATTACK]: 31,
        [STATS.SPECIAL_DEFENSE]: 31,
        [STATS.SPEED]: 31,
      },
      evs: {
        [STATS.HP]: 0,
        [STATS.ATTACK]: 3,
        [STATS.DEFENSE]: 0,
        [STATS.SPECIAL_ATTACK]: 4,
        [STATS.SPECIAL_DEFENSE]: 0,
        [STATS.SPEED]: 0,
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
