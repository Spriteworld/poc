import Phaser from 'phaser';
import GridEngine from 'grid-engine';
import var_export from 'locutus/php/var/var_export';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, map) {
    super(scene, x, y, texture);
    this.config = {};
    this.config.x = x;
    this.config.y = y;
    this.config.texture = texture;
    this.config.scene = scene;
    this.config.map = map;
    this.debugText = {};

    this.depth = 1;

    this.playerSprite = scene.add.sprite(0, 0, this.config.texture);
    this.create();
    this.config.scene.cameras.main.zoom = 1;
    this.config.scene.cameras.main.startFollow(this.playerSprite, true);
  }

  create() {
    const gridEngineConfig = {
      characters: [{
        id: 'player',
        sprite: this.playerSprite,
        walkingAnimationMapping: {
          up: {
            leftFoot: 15,
            standing: 12,
            rightFoot: 13,
          },
          down: {
            leftFoot: 1,
            standing: 0,
            rightFoot: 3,
          },
          left: {
            leftFoot: 5,
            standing: 4,
            rightFoot: 7,
          },
          right: {
            leftFoot: 8,
            standing: 9,
            rightFoot: 10,
          },
        },
        startPosition: { x: this.config.x, y: this.config.y },
      }],
    };
    this.scene.gridEngine.create(this.config.map, gridEngineConfig);

    this.scene.gridEngine
      .positionChangeFinished()
      .subscribe(({ charId, exitTile, enterTile }) => {
        var warp = this.getProperty(this.config.map, enterTile, 'warp');
        if (warp) {
          this.scene.scene.switch(warp);
        }
      });
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

  getProperty(tilemap, position, property) {
    var output = null;

    tilemap.layers.some(function(layer) {
      const tile = tilemap.getTileAt(position.x, position.y, false, layer.name);
      if (tile === null) {
        output = null;
        return null;
      }

      if (tile.properties.length === 0) {
        output = null;
        return null;
      }

      output = tile.properties[property];
      return output;
    });

    return output;
  }

}
