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

  init(data) {
    super.init(data);
    this.mon = [];
  }

  preload() {
    this.preloadMap();
  }

  create () {
    this.loadMap();
    this.addPlayerToScene(16, 16);

    this.addMonToScene('RNG', 18, 17, {
      spinRate: 600,
    });
    // this.addMonToScene('RNG', 17, 17, {
    //   spinRate: 600,
    //   shiny: true
    // });
    this.addMonToScene('RNG', 10, 5);
    this.addMonToScene('RNG', 11, 5);
    this.addMonToScene('RNG', 12, 5);
    this.addMonToScene('RNG', 13, 5);
    this.addMonToScene('RNG', 14, 5);

    this.createCharacters();
  }

  update(time, delta) {
    this.updateCharacters(time, delta);
  }

  addMonToScene(monId, x, y, config) {
    if (monId == 'RNG') {
      monId = (Math.floor(Math.random() * 12) +1)
        .toString()
        .padStart(3, '0');
    }

    let texture = monId.toString();
    if (this.getValue(config, 'shiny', false)) {
      texture += 's';
    }

    let pkmnDef = {
      id: 'mon'+this.mon.length,
      texture: texture,
      x: x,
      y: y,
      scene: this,
      spin: true,
      spinRate: (Math.floor(Math.random() * 1000) +1)
    };

    this.mon.push(new PkmnOverworld({
      ...pkmnDef, ...config
    }));
  }
}
