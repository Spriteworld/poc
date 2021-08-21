import {GameMap} from '@Scenes';
import {Player} from '@Objects';
import {TestMap} from '@Maps';

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
    this.player = new Player({
      id: 'player',
      texture: 'red',
      x: 16,
      y: 15,
      scene: this,
    });
    this.registry.set('player', this.player);
    this.cameras.main.zoom = 1.6;
    this.cameras.main.startFollow(this.player.config.sprite, true);

    this.createCharacters();
    // PhaserGUIAction(this);
  }

  update() {
    this.player.update();
  }

}
