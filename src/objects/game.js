import Phaser from 'phaser';
import {Preload, Test, PalletTown, HeroHouseF1} from '@Scenes';

export default class extends Phaser.Game {
  constructor(config) {
    super(config);

    this.scene.add('Preload', Preload, true);
    this.scene.add('Test', Test);
    this.scene.add('PalletTown', PalletTown);
    this.scene.add('HeroHouseF1', HeroHouseF1);
  }
}
