import Phaser from 'phaser';

export default class extends Phaser.Game {
  constructor(config) {
    super(config);

    this.scene.start('Preload', true);
  }
}
