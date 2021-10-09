import Phaser from 'phaser';

export default class extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.texture);
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

    this.setName(this.id);

    this.ge = this.config.scene.gridEngine;
    this.spinRate = this.config['spin-rate'];
    this.slidingDir = null;
    this.spinningDir = null;

    this.config.scene.add.existing(this);
    this.config.scene.addCharacter(
      this.characterDef(this.config)
    );
  }

  characterFramesDef() {
    return {
      up: { leftFoot: 13, standing: 12, rightFoot: 15 },
      down: { leftFoot: 1, standing: 0, rightFoot: 3 },
      left: { leftFoot: 7, standing: 4, rightFoot: 5 },
      right: { leftFoot: 9, standing: 8, rightFoot: 11 },
    };
  }

  characterFramesStaticDef() {
    return {
      up: { leftFoot: 12, standing: 12, rightFoot: 12 },
      down: { leftFoot: 0, standing: 0, rightFoot: 0 },
      left: { leftFoot: 4, standing: 4, rightFoot: 4 },
      right: { leftFoot: 8, standing: 8, rightFoot: 8 },
    };
  }

  characterDef(def) {
    return {
      id: def.id,
      sprite: this,
      walkingAnimationMapping: this.characterFramesDef(),
      startPosition: { x: def.x, y: def.y },
      facingDirection: def.facingDirection,
      collides: def.collides,
      charLayer: 'ground',
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

  stopMovement() {
    return this.ge.stopMovement(this.config.id);
  }

  getFacingDirection() {
    return this.ge.getFacingDirection(this.config.id);
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

  handleMovement() {
    if (this.slidingDir !== null) {
      this.move(this.slidingDir);
      return;
    }
    if (this.spinningDir !== null) {
      this.move(this.spinningDir);
      return;
    }

    let allowed = this.config.scene.registry.get('player_input')
      || this.spinningDir === null
      || this.slidingDir === null
    ;
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
    if (this.spinningDir !== null || this.slidingDir !== null) {
      return;
    }

    // run
    let activator = this.config.scene.input.keyboard.addKey('X');
    if (!this.config.scene.inside && activator.isDown) {
      this.ge.setSpeed(this.config.id, 8);
      return;
    }

    // bike
    let activator2 = this.config.scene.input.keyboard.addKey('C');
    if (!this.config.scene.inside && activator2.isDown) {
      this.ge.setSpeed(this.config.id, 20);
      return;
    }

    this.ge.setSpeed(this.config.id, 4);
  }

  startSliding(direction) {
    this.ge.setWalkingAnimationMapping(this.config.id, this.characterFramesStaticDef());
    this.slidingDir = direction;
  }

  stopSliding() {
    this.ge.setWalkingAnimationMapping(this.config.id, this.characterFramesDef());
    this.slidingDir = null;
  }

  startSpinning(direction) {
    this.ge.setWalkingAnimationMapping(this.config.id, undefined);
    this.anims.play(this.config.texture+'-spin');
    this.spinningDir = direction;
  }

  stopSpinning() {
    this.ge.setWalkingAnimationMapping(this.config.id, this.characterFramesDef());
    this.anims.stop();
    this.spinningDir = null;
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
    let lookDir = this.config['facing-direction'];
    let faceDir = this.getFacingDirection();

    if (faceDir !== lookDir) {
      this.look(lookDir);
      return;
    }

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
