import Phaser from 'phaser';
import {PalletTownMap} from '@Maps';
import {Player} from '@Objects';

export default class PalletTown extends Phaser.Scene {
  constructor() {
    super({ key: 'PalletTown' });
  }

  preload () {
    this.load.tilemapTiledJSON('PalletTownMap', PalletTownMap);
  }

  create () {
    const map = this.make.tilemap({key: 'PalletTownMap'});
    var mapTileset = map.addTilesetImage('gen3_outside', 'gen3_outside');

    map.createLayer('floor', mapTileset);
    map.createLayer('ground', mapTileset);
    map.createLayer('top', mapTileset);
    map.createLayer('animation', mapTileset);

    this.player = new Player(this, 6, 8, 'red', map);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    this.player.update(cursors);
  }
}
