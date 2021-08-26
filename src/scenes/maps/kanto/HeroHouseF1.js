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
    this.addPlayerToScene(4, 9);

    this.createCharacters();
  }

  update() {
    this.player.update();
  }
}
