import {GameMap} from '@Scenes';
import {Player, NPC} from '@Objects';
import {StarterTownMap} from '@Maps';

export default class extends GameMap {
  constructor() {
    super({
      mapName: 'StarterTown',
      map: StarterTownMap
    });
  }

  preload() {
    this.preloadMap();
  }

  create () {
    this.loadMap();
    this.addPlayerToScene(6, 5);

    this.createCharacters();
  }

  update() {
    this.player.update();
  }
}

