import {GameMap} from '@Scenes';
import {Player, NPC} from '@Objects';
import {HeroHouseF1Map} from '@Maps';

export default class extends GameMap {
  constructor() {
    super({
      mapName: 'HeroHouseF1',
      map: HeroHouseF1Map,
      inside: true
    });
  }

  preload() {
    this.preloadMap();
  }

  create () {
    this.loadMap();
    this.player = new Player({
      id: 'player',
      texture: 'red',
      x: 4,
      y: 9,
      scene: this,
    });
    this.registry.set('player', this.player);
    this.cameras.main.zoom = 1.6;
    this.cameras.main.startFollow(this.player.config.sprite, true);
  }

  update() {
    this.player.update();
  }
}
