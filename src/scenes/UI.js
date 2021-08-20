import Phaser from 'phaser';
import {textBox} from '@Utilities';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'UI' });

  }

  preload () {
  }

  create () {
    console.log('UI::create');
    this.activeScene = this.registry.get('scene');
    if (this.registry.has('interactions') === false) {
      this.registry.set('interactions', []);
    }


      // this.textbox = textBox(this, 100, 400, {
      //   wrapWidth: 500,
      //   fixedWidth: 500,
      //   fixedHeight: 65
      // });

      // this.textbox.setDepth(100);
  }

  initSigns(map) {
    const signs = map.filterObjects('interactions', (obj) => obj.type === 'sign');
    console.log(signs);
    if (signs.length === 0) {
      return;
    }

    signs.map((sign) => {
      sign.x /= 32;
      sign.y /= 32;
      this.interactTile(map, sign, 0x00afe4);
    });
  }

  interactTile(map, obj, color) {
    this.registry.get('interactions').push({x: obj.x, y: obj.y, obj: obj});
    this.tintTile(map, obj.x,    obj.y,     color); // actual
    this.tintTile(map, obj.x -1, obj.y,     color); // left
    this.tintTile(map, obj.x +1, obj.y,     color); // right
    this.tintTile(map, obj.x,    obj.y -1,  color); // up
    this.tintTile(map, obj.x,    obj.y +1,  color); // down
  }

  tintTile(tilemap, col, row, color) {
    for (let i = 0; i < tilemap.layers.length; i++) {
      tilemap.layers[i].tilemapLayer.layer.data[row][col].tint = color;
    }
  }

  debugRegistry() {
    console.log(this.registry.getAll());
  }
}
