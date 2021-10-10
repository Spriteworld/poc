import {GameMap} from '@Scenes';
import {SkylandMap} from '@Maps';

export default class extends GameMap {
  constructor() {
    super({
      mapName: 'Skyland',
      map: SkylandMap
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
