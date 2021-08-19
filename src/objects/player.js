import Phaser from 'phaser';
import GridEngine from 'grid-engine';

export default class extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, map) {
    super(scene, x, y, texture);
    this.config = {};
    this.config.x = x;
    this.config.y = y;
    this.config.texture = texture;
    this.config.scene = scene;
    this.config.map = map;
    this.debugText = {};

    this.playerSprite = scene.add.sprite(0, 0, this.config.texture);
    this.playerSprite.setScale(2);

    this.create();
    this.config.scene.cameras.main.zoom = 1.6;
    this.config.scene.cameras.main.startFollow(this.playerSprite, true);
  }

  create() {
    const gridEngineConfig = {
      characters: [{
        id: 'player',
        sprite: this.playerSprite,
        depth: 2,
        walkingAnimationMapping: {
          up: {
            leftFoot: 36,
            standing: 37,
            rightFoot: 38,
          },
          down: {
            leftFoot: 0,
            standing: 1,
            rightFoot: 2,
          },
          left: {
            leftFoot: 12,
            standing: 13,
            rightFoot: 14,
          },
          right: {
            leftFoot: 24,
            standing: 25,
            rightFoot: 26,
          },
        },
        startPosition: { x: this.config.x, y: this.config.y },
      }],
    };
    this.scene.gridEngine.create(this.config.map, gridEngineConfig);
  }

  update(cursors) {
    if (cursors.left.isDown) {
      this.scene.gridEngine.move('player', 'left');
    } else if (cursors.right.isDown) {
      this.scene.gridEngine.move('player', 'right');
    } else if (cursors.up.isDown) {
      this.scene.gridEngine.move('player', 'up');
    } else if (cursors.down.isDown) {
      this.scene.gridEngine.move('player', 'down');
    }
  }

  getPositionX() {
    return this.x;
  }

  getPositionY() {
    return this.y;
  }

}
