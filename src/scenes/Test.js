import Phaser from 'phaser';
import {TestMap, StarterTownMap} from '@Maps';
import {Player} from '@Objects';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Test' });
  }

  preload () {
    this.load.tilemapTiledJSONExternal('TestMap', TestMap);
  }

  create () {
    console.log('Test::create');
    const map = this.make.tilemap({key: 'TestMap'});
    this.registry.set('scene', 'Test');
    var mapTileset = map.addTilesetImage('gen3_outside', 'gen3_outside');

    map.createLayer('floor', mapTileset).setName('floor');
    map.createLayer('encounters', mapTileset).setName('encounters');
    map.createLayer('ground', mapTileset).setName('ground');
    map.createLayer('top', mapTileset).setName('top');

    this.player = new Player(this, 20, 18, 'red', map);
    this.registry.set('player', this.player);

    this.objects = map.getObjectLayer('interactions');
    this.scene.get('UI').initSigns(map);

    this.animatedTiles.init(map);

    // PhaserGUIAction(this);
  }

  update() {
    this.player.update();
  }

}
