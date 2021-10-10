import {GameMap} from '@Scenes';
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
    this.createCharacters();
  }

  update(time, delta) {
    this.updateCharacters(time, delta);
  }
}
