import Phaser from 'phaser';
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
    this.addPlayerToScene(16, 16);
    this.addPlayerMonToScene('RNG', this.player.config.x +1, this.player.config.y);

    this.addMonToScene('197', 18, 17, {
      spinRate: 600,
    });
    this.addMonToScene('197', 17, 17, {
      spinRate: 600,
      shiny: true
    });
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

    let texture = monId.toString();
    if (Phaser.Utils.Objects.GetValue(config, 'shiny', false)) {
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
