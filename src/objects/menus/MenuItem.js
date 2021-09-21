import Phaser from 'phaser';

export default class extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15});
    scene.add.existing(this);
  }

  select() {
    this.setColor('#f8ff38');
  }

  deselect() {
    this.setColor('#ffffff');
  }
}

