import Phaser from 'phaser';
import {StarterTownMap} from '@Maps';
import {Player} from '@Objects';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'StarterTown' });
  }

  preload () {
    this.load.tilemapTiledJSONExternal('StarterTownMap', StarterTownMap);
  }

  create () {
    console.log('StarterTown::create');
    const map = this.make.tilemap({key: 'StarterTownMap'});
    this.registry.set('scene', 'StarterTown');
    var mapTileset = map.addTilesetImage('gen3_outside', 'gen3_outside');

    map.createLayer('floor', mapTileset).setName('floor');
    map.createLayer('floordetail', mapTileset).setName('floordetail');
    map.createLayer('ground', mapTileset).setName('ground');
    map.createLayer('top', mapTileset).setName('top');
    map.createLayer('topdetail', mapTileset).setName('topdetail');

    this.player = new Player(this, 6, 5, 'red', map);
    this.registry.set('player', this.player);

    this.objects = map.getObjectLayer('interactions');
    this.scene.get('UI').initSigns(map);

    // PhaserGUIAction(this);
  }

  update() {
    this.player.update();
  }

}
