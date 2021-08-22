import {GameMap} from '@Scenes';
import {TestMap} from '@Maps';
import {PkmnOverworld} from '@Objects';

export default class extends GameMap {
  constructor() {
    super({
      mapName: 'Test',
      map: TestMap
    });
    this.mon = [];
  }

  preload() {
    this.preloadMap();
  }

  create () {
    this.loadMap();
    this.addPlayerToScene(16, 15);
    this.addPlayerMonToScene('RNG', 17, 15);

    this.addMonToScene('197', 18, 17);
    this.addMonToScene('025', 10, 5);
    this.addMonToScene('RNG', 11, 5);
    this.addMonToScene('RNG', 12, 5);
    this.addMonToScene('RNG', 13, 5);
    this.addMonToScene('RNG', 14, 5);

    this.createCharacters();

    this.gridEngine
      .positionChangeFinished()
      .subscribe(({ charId, exitTile, enterTile }) => {
        if (charId !== this.player.config.id) { return; }
        this.pokemon.moveTo(exitTile.x, exitTile.y);
      });

    // PhaserGUIAction(this);
  }

  update(time, delta) {
    this.player.update(time, delta);
    this.pokemon.update(time, delta);
    this.mon.forEach(function(mon) {
      mon.update(time, delta);
    });
  }

  addMonToScene(monId, x, y, config) {
    if (monId == 'RNG') {
      monId = (Math.floor(Math.random() * 251) +1)
        .toString()
        .padStart(3, '0');
    }

    let pkmnDef = {
      id: 'mon'+this.mon.length,
      texture: monId.toString(),
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
