import Phaser from 'phaser';
import {TestMap} from '@Maps';
import {Player} from '@Objects';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Test' });
  }

  preload () {
    this.load.tilemapTiledJSONExternal('TestMap', TestMap);
  }

  create () {
    const map = this.make.tilemap({key: 'TestMap'});
    var mapTileset = map.addTilesetImage('gen3_outside', 'gen3_outside');

    map.createLayer('floor', mapTileset).setDepth(1).setName('floor');
    map.createLayer('ground', mapTileset).setDepth(2).setName('ground');
    map.createLayer('top', mapTileset).setDepth('2000').setName('top');


    this.player = new Player(this, 16, 16, 'red', map);

    this.objects = map.getObjectLayer('interactions');
    this.scene.get('UI').initSigns(map);
    this.createInteractions(this.objects);

    PhaserGUIAction(this);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    this.player.update(cursors);

    // console.log({
    //   x: this.player.getPositionX(),
    //   y: this.player.getPositionY()
    // });
  }

  createInteractions(objects) {
    objects.objects.forEach((object) => {
      console.log(object.type+' found');
      switch (object.type) {
        case 'sign':
          console.log(object.properties[0].value);
        break;

        case 'warp':
          // new Warp(this, object);
        break;

        default:
          console.log(object.type+ ' not implemented');
      }

    })
  }
}
