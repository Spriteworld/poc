import Phaser from 'phaser';

export default class extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.config = {...{
      sprite: null,
      scene: null,
      id: null,
      spin: 'down',
      'spin-rate': 600,
      move: false,
      'move-rate': 600,
      'move-radius': 1,
      follow: false,
      collides: true,
      'facing-direction': 'down',
    }, ...config};

    this.config.sprite = this.config.scene.add.sprite(0, 0, this.config.texture);

    this.ge = this.config.scene.gridEngine;
    this.spinRate = this.config['spin-rate'];

    this.config.scene.add.existing(this);
    this.config.scene.addCharacter(
      this.characterDef(this.config)
    );
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
      facingDirection: def.facingDirection,
      collides: def.collides,
    };
  }

  getCharacter() {
    let characters = this.ge.getAllCharacters();

    return characters.some((char) => char.id === this.config.id);
  }

  getPosition() {
    return this.ge.getPosition(this.config.id);
  }

  // setPosition(x, y) {
  //   return this.ge.setPosition(this.config.id, x, y);
  // }

  look(dir) {
    return this.ge.turnTowards(this.config.id, dir.toLowerCase());
  }

  lookAt(character) {
    return this.ge.turnTowards(this.config.id, this.ge.getFacingPosition(character.config.id));
  }

  move(dir) {
    return this.ge.move(this.config.id, dir.toLowerCase());
  }

  moveTo(x, y) {
    return this.ge.moveTo(this.config.id, {x:x, y:y});
  }

  stop() {
    return this.ge.stopMovement(this.config.id);
  }

  getPosInFacingDirection() {
    const pos = this.ge.getPosition(this.config.id);
    const dir = this.ge.getFacingDirection(this.config.id);
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

  getPosInBehindDirection() {
    const pos = this.ge.getPosition(this.config.id);
    const dir = this.ge.getFacingDirection(this.config.id);
    if (dir === 'up') {
      return { ...pos, y: pos.y + 1 };
    } else if (dir === 'down') {
      return { ...pos, y: pos.y - 1 };
    } else if (dir === 'left') {
      return { ...pos, x: pos.x + 1 };
    } else if (dir === 'right') {
      return { ...pos, x: pos.x - 1 };
    }
  }

  getGridEngine() {
    return this.ge;
  }

  // trying to make you insta move if looking in the right direction
  // updateLooking() {
  //   this.playerWasLooking = this.ge.getFacingDirection(this.config.id);
  // }

  handleMovement() {
    let allowed = this.config.scene.registry.get('player_input');
    if (allowed === false) { return; }

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

  handleRun() {
    let activator = this.config.scene.input.keyboard.addKey('X');
    if (!this.config.scene.inside && activator.isDown) {
      this.ge.setSpeed(this.config.id, 8);
    } else {
      this.ge.setSpeed(this.config.id, 4);
    }
    let activator2 = this.config.scene.input.keyboard.addKey('C');
    if (!this.config.scene.inside && activator2.isDown) {
      this.ge.setSpeed(this.config.id, 20);
    } else {
      this.ge.setSpeed(this.config.id, 4);
    }
  }

  moveUntilBlocked() {
    if (this.config.move !== true) { return; }
    this.ge.moveUntilBlocked(this.config.id, this.config['move-rate'], 1);
    this.config.move = false;
  }

  addAutoMove() {
    if (this.config.move !== true) { return; }
    this.ge.moveRandomly(this.config.id, this.config['move-rate'], 1);
    this.config.move = false;
  }

  addAutoSpin(delta) {
    if (this.config.spin !== true) { return; }
    this.spinRate -= delta;
    if (this.spinRate <= 0) {
      this.spinRate = this.config['spin-rate'];

      let dir = 'down';
      switch (Math.floor(Math.random() * 4) +1) {
        case 1: dir = 'up'; break;
        case 2: dir = 'down'; break;
        case 3: dir = 'left'; break;
        case 4: dir = 'right'; break;
      }
      this.look(dir);
    }
  }
}