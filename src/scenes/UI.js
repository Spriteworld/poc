import Phaser from 'phaser';
import {textBox} from '@Utilities';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'UI' });

    this.signs = {};
  }

  preload () {
  }

  create () {

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
    return;

    signs.map((sign) =>
      new Enemy(this, enemyPoint.x, enemyPoint.y, 'tiles_spr', this.player, 503)
        .setName(enemyPoint.id.toString())
        .setScale(1.5),
    );
  }

  clearSigns() {
    this.signs = {};
  }
}
