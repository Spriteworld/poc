import {GameMap} from '@Scenes';
import {TestMap} from '@Maps';
import {PkmnOverworld} from '@Objects';

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
    this.addPlayerToScene(16, 16);

    this.addMonToScene('197', 18, 17, {
      'spin-rate': 600,
    });
    this.addMonToScene('197', 17, 17, {
      'spin-rate': 600,
    });
    this.addMonToScene('197', 16, 17, {
      'spin-rate': 600,
      shiny: true
    });
    this.addMonToScene('RNG', 10, 5);
    this.addMonToScene('RNG', 11, 5);
    this.addMonToScene('RNG', 12, 5);
    this.addMonToScene('RNG', 13, 5);
    this.addMonToScene('RNG', 14, 5);

    this.createCharacters();
    // this.player.disableMovement();
  }

  update(time, delta) {
    this.updateCharacters(time, delta);
  }
}