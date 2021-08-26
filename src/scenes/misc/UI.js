import Phaser from 'phaser';
import {textBox} from '@Utilities';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'UI' });

  }

  preload () {
  }

  create () {
    this.activeScene = this.registry.get('scene');
    if (this.registry.has('interactions') === false) {
      this.registry.set('interactions', []);
    }
    if (this.registry.has('warps') === false) {
      this.registry.set('warps', []);
    }


      // this.textbox = textBox(this, 100, 400, {
      //   wrapWidth: 500,
      //   fixedWidth: 500,
      //   fixedHeight: 65
      // });

      // this.textbox.setDepth(100);
  }

}
