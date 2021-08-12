import Phaser from 'phaser';
import {HeroHouseF1Map} from '@Maps';
import {Player} from '@Objects';

export default class HeroHouseF1 extends Phaser.Scene {
  constructor() {
    super({ key: 'HeroHouseF1' });
  }

  preload () {
    this.load.tilemapTiledJSON('HeroHouseF1Map', HeroHouseF1Map);
  }

  create () {
    const map = this.make.tilemap({key: 'HeroHouseF1Map'});
    var mapTileset = map.addTilesetImage('gen3_inside', 'gen3_inside');

    map.createLayer('floor', mapTileset);
    map.createLayer('ground', mapTileset);
    map.createLayer('top', mapTileset);
    map.createLayer('animation', mapTileset);

    this.player = new Player(this, 8, 6, 'red', map);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    this.player.update(cursors);
  }
}
