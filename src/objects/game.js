import Phaser from 'phaser';
import {
  UI, Preload,
  Test,
  BattleScene,
  PalletTown,
  HeroHouseF1,
  HeroHouseF2,
  // StarterTown
} from '@Scenes';

export default class extends Phaser.Game {
  constructor(config) {
    super(config);

    this.scene.add('UI', UI);
    this.scene.add('Preload', Preload);
    this.scene.add('Test', Test);
    this.scene.add('BattleScene', BattleScene);
    this.scene.add('PalletTown', PalletTown);
    this.scene.add('HeroHouseF1', HeroHouseF1);
    this.scene.add('HeroHouseF2', HeroHouseF2);
    // this.scene.add('StarterTown', StarterTown);

    this.scene.start('Preload');
  }
}
