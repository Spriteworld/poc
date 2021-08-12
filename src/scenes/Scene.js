import Phaser from 'phaser';
import {PalletMap, TestMap} from '@Maps';
import {Player} from '@Objects';

export default class Scene extends Phaser.Scene {
  constructor(map, inside, x, y) {
    super({ key: map });
    this.config = {};
    this.config.map = map;
    this.config.inside = inside || false;
    this.config.x = x || 0;
    this.config.y = y || 0;
    console.log(['loaded Scene', this.config]);
  }

  preload () {
    console.log(['loading map', this.map]);
    this.load.tilemapTiledJSON(this.map+'Map', this.map+'Map');
  }

  create () {
    console.log(['creating map', this.map]);
    const map = this.make.tilemap({key: this.map});
    var mapInside = map.addTilesetImage('gen3_inside', 'gen3_inside');
    var mapOutside = map.addTilesetImage('gen3_outside', 'gen3_outside');

    map.createLayer('floor', this.config.inside ? mapInside : mapOutside);
    map.createLayer('ground', this.config.inside ? mapInside : mapOutside);
    map.createLayer('top', this.config.inside ? mapInside : mapOutside);
    map.createLayer('animation', this.config.inside ? mapInside : mapOutside);

    this.player = new Player(this, this.config.x, this.config.y, 'red', map);

  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    this.player.update(cursors);
  }
}
