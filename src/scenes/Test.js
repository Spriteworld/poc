import Phaser from 'phaser';
import {TestMap} from '@Maps';
import {Player, NPC} from '@Objects';
import {GameMap} from '@Scenes';

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

    this.npcs = this.add.group();
    this.npcs.runChildUpdate = true;
    this.npcs.add(new NPC({
      id: 'npc1',
      texture: 'ace_trainer',
      x: 16,
      y: 16,
      scene: this,
      facingDirection: 'up',
      // spin: true,
      move: 'random'
    }));

    // PhaserGUIAction(this);
  }

  update() {
    this.player.update();
  }

}
