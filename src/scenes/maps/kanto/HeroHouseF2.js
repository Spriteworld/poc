import {GameMap} from '@Objects';
import {HeroHouseF2Map} from '@Maps';

export default class extends GameMap {
  constructor() {
    super({
      mapName: 'HeroHouseF2',
      map: HeroHouseF2Map,
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
