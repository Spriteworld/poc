import {GameMap} from '@Scenes';
import {Player, NPC} from '@Objects';
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
    this.addPlayerToScene(6, 7);

    this.createCharacters();
  }

  update() {
    this.player.update();
  }
}
