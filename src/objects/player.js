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

    this.cursors = {};

    this.playerSprite = scene.add.sprite(0, 0, this.config.texture);
    this.playerSprite.setScale(2);

    this.create();
    this.config.scene.cameras.main.zoom = 1.6;
    this.config.scene.cameras.main.startFollow(this.playerSprite, true);
  }

  create() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();

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

  update() {
    const duration = 120;
    if (this.cursors.left.isDown) {
      this.cursors.left.getDuration() >= duration
        ? this.move('left')
        : this.look('left');
    } else if (this.cursors.right.isDown) {
      this.cursors.right.getDuration() >= duration
        ? this.move('right')
        : this.look('right');
    } else if (this.cursors.up.isDown) {
      this.cursors.up.getDuration() >= duration
        ? this.move('up')
        : this.look('up');
    } else if (this.cursors.down.isDown) {
      this.cursors.down.getDuration() >= duration
        ? this.move('down')
        : this.look('down');
    }

    const interactions = this.scene.registry.get('interactions');

    // get the dir player is facing
    const position = this.getPosInFacingDirection();

    // check if the player is facing an interaction
    const hasInteraction = interactions.some(function(interaction) {
      return position.x == interaction.x && position.y == interaction.y;
    });

    const activator = this.scene.input.keyboard.addKey('Z');
    if (hasInteraction && activator.isDown) {
      // get said interaction
      const interaction = this.config.map.filterObjects('interactions', (obj) => position.x == obj.x && position.y == obj.y)[0];

      // alert the type
      console.log(interaction);
      switch (interaction.type) {
        case 'sign':
          alert(interaction.properties[0].value);
        break;
        default:
          alert(interaction.type);
      }
    }

  }

  getPositionX() {
    return this.x;
  }

  getPositionY() {
    return this.y;
  }

  look(dir) {
    return this.scene.gridEngine.turnTowards('player', dir);
  }

  move(dir) {
    return this.scene.gridEngine.move('player', dir);
  }

  moveTo(x, y) {
    return this.scene.gridEngine.moveTo('player', {x:x, y:y});
  }

  getPosInFacingDirection() {
    const pos = this.scene.gridEngine.getPosition('player');
    const dir = this.scene.gridEngine.getFacingDirection('player');
    if (dir === 'up') {
      return { ...pos, y: pos.y - 1 };
    } else if (dir === 'down') {
      return { ...pos, y: pos.y + 1 };
    } else if (dir === 'left') {
      return { ...pos, x: pos.x - 1 };
    } else if (dir === 'right') {
      return { ...pos, x: pos.x + 1 };
    }
  }

  getGridEngine() {
    return this.scene.gridEngine;
  }

}
