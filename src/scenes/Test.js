import Phaser from 'phaser';
import {TestMap} from '@Maps';
import {Player} from '@Objects';

export default class Test extends Phaser.Scene {
  constructor() {
    super({ key: 'Test' });
    console.log('loaded test');
  }

  preload () {
    console.log('loaded test::preload');
    this.load.tilemapTiledJSON('TestMap', TestMap);
  }

  create () {
    console.log('loaded test::create');
    const map = this.make.tilemap({key: 'TestMap'});
    var mapTileset = map.addTilesetImage('gen3_outside', 'gen3_outside');

    map.createLayer('floor', mapTileset);
    map.createLayer('ground', mapTileset);
    map.createLayer('top', mapTileset);
    map.createLayer('animation', mapTileset);

    this.player = new Player(this, 36, 6, 'red', map);

    // PhaserGUIAction(this);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    this.player.update(cursors);
  }
}
