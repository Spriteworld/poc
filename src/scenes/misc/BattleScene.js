import Phaser from 'phaser';

export default class extends Phaser.Scene {
  constructor(config) {
    super({ key: 'BattleScene' });
    this.config = config || {};
    this.config.player = {};
    this.config.enemy = {};
  }

  init(data) {
    this.config = { ...this.config, ...data };
  }

  preload () {

  }

  create () {
    console.log('Battle System');
    console.log(this.config);
  }

  update () {

  }

  showPokemon (pokemon, x, y) {

  }

}
