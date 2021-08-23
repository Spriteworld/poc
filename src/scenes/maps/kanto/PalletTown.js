import {GameMap} from '@Scenes';
import {Player, NPC} from '@Objects';
import {PalletTownMap} from '@Maps';

export default class extends GameMap {
  constructor() {
    super({
      mapName: 'PalletTown',
      map: PalletTownMap
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
      x: 6,
      y: 8,
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
