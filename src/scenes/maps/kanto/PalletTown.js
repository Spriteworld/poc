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
    this.addPlayerToScene(6, 8);

    this.createCharacters();
  }

  update() {
    this.player.update();
  }
}
