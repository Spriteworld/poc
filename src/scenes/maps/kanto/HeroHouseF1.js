import {GameMap} from '@Scenes';
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
    this.createCharacters();
  }

  update(time, delta) {
    this.updateCharacters(time, delta);
  }
}
