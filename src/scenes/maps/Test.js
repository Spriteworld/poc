import {GameMap} from '@Scenes';
import {TestMap} from '@Maps';
import {PkmnOverworld} from '@Objects';
import { STATS } from '@pokelinkapp/pokemon-data/';
import { GROWTH, NATURES, BasePokemon } from '@pokelinkapp/pokemon-data/src/pokemon';

export default class extends GameMap {
  constructor() {
    super({
      mapName: 'Test',
      map: TestMap
    });
  }

  preload() {
    this.preloadMap();
  }

  create () {
    this.loadMap();
    // this.addPlayerToScene(16, 16);
    // this.addPlayerToScene(24, 42);
    // this.addPlayerToScene(8, 6);
    this.addPlayerToScene(11, 20);

    this.createCharacters();
    // this.player.disableMovement();
  }

  update(time, delta) {
    this.updateCharacters(time, delta);
  }

}
