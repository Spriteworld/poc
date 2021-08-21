import Phaser from 'phaser';
import {TestMap, StarterTownMap} from '@Maps';
import {Player, NPC} from '@Objects';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Test' });
  }

  preload () {
    this.load.tilemapTiledJSONExternal('TestMap', TestMap);
  }

  create () {
    const map = this.make.tilemap({key: 'TestMap'});
    this.registry.set('scene', 'Test');
    var mapTileset = map.addTilesetImage('gen3_outside', 'gen3_outside');

    map.createLayer('floor', mapTileset).setName('floor');
    map.createLayer('encounters', mapTileset).setName('encounters');
    map.createLayer('ground', mapTileset).setName('ground');
    map.createLayer('top', mapTileset).setName('top');

    this.player = new Player({
      id: 'player',
      texture: 'red',
      x: 16,
      y: 15,
      scene: this,
      map: map,
    });
    this.registry.set('player', this.player);
    this.cameras.main.zoom = 1.6;
    this.cameras.main.startFollow(this.player.config.sprite, true);

    this.npcs = this.add.group();
    this.npcs.runChildUpdate = true;
    this.npcs.add(new NPC({
      id: 'npc1',
      texture: 'ace_trainer',
      x: 16,
      y: 16,
      scene: this,
      map: map,
      facingDirection: 'up',
      // spin: true,
      move: 'random'
    }));

    this.npcs.add(new NPC({
      id: 'npc2',
      texture: 'ace_trainer',
      x: 12,
      y: 10,
      scene: this,
      map: map,
      facingDirection: 'down',
      spin: true,
      spinRate: 1,
    }));
    this.npcs.add(new NPC({
      id: 'npc3',
      texture: 'ace_trainer',
      x: 13,
      y: 10,
      scene: this,
      map: map,
      facingDirection: 'up',
      spin: true,
      spinRate: 200,
    }));
    this.npcs.add(new NPC({
      id: 'npc4',
      texture: 'ace_trainer',
      x: 14,
      y: 10,
      scene: this,
      map: map,
      facingDirection: 'up',
      spin: true,
      spinRate: 600,
    }));
    this.objects = map.getObjectLayer('interactions');
    this.scene.get('UI').initSigns(map);

    this.animatedTiles.init(map);

    // PhaserGUIAction(this);
  }

  update() {
    this.player.update();
  }


}
