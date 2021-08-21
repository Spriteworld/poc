import Phaser from 'phaser';

export default class extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.config = config;
    this.config.sprite = this.config.scene.add.sprite(0, 0, this.config.texture);

    this.config.scene.add.existing(this);
  }

  characterFramesDef() {
    return {
      up: {
        leftFoot: 13,
        standing: 12,
        rightFoot: 15,
      },
      down: {
        leftFoot: 1,
        standing: 0,
        rightFoot: 3,
      },
      left: {
        leftFoot: 7,
        standing: 4,
        rightFoot: 5,
      },
      right: {
        leftFoot: 9,
        standing: 8,
        rightFoot: 11,
      },
    };
  }

  characterDef(def) {
    return {
      id: def.id,
      sprite: def.sprite,
      walkingAnimationMapping: this.characterFramesDef(),
      startPosition: { x: def.x, y: def.y },
      facingDirection: def.facingDirection || 'down',
    };
  }

  getPositionX() {
    return this.x;
  }

  getPositionY() {
    return this.y;
  }

  look(dir) {
    return this.config.scene.gridEngine.turnTowards(this.config.id, dir);
  }

  move(dir) {
    return this.config.scene.gridEngine.move(this.config.id, dir);
  }

  moveTo(x, y) {
    return this.config.scene.gridEngine.moveTo(this.config.id, {x:x, y:y});
  }

  getPosInFacingDirection() {
    const pos = this.config.scene.gridEngine.getPosition(this.config.id);
    const dir = this.config.scene.gridEngine.getFacingDirection('player');
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
    return this.config.scene.gridEngine;
  }

  handleMovement() {
    const duration = 120;
    if (this.config.cursors.left.isDown) {
      this.config.cursors.left.getDuration() >= duration
        ? this.move('left')
        : this.look('left');
    } else if (this.config.cursors.right.isDown) {
      this.config.cursors.right.getDuration() >= duration
        ? this.move('right')
        : this.look('right');
    } else if (this.config.cursors.up.isDown) {
      this.config.cursors.up.getDuration() >= duration
        ? this.move('up')
        : this.look('up');
    } else if (this.config.cursors.down.isDown) {
      this.config.cursors.down.getDuration() >= duration
        ? this.move('down')
        : this.look('down');
    }
  }


}
