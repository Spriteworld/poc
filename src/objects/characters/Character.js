import Phaser from 'phaser';
import { Tile } from '@Objects';

export default class extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.texture);
    this.config = {...{
      scene: null,
      id: null,
      spin: false,
      'spin-rate': 600,
      move: false,
      'move-rate': 600,
      'move-radius': 1,
      follow: false,
      collides: true,
      'facing-direction': 'down',
      'seen-radius': 0,
      'seen-character': null,
      charLayer: 'ground',
      canRun: true
    }, ...config};

    this.setName(this.id);

    this.initalCreation = true;
    this.ge = this.config.scene.gridEngine;
    this.spinRate = this.config['spin-rate'];
    this.slidingDir = null;
    this.spinningDir = null;

    this.config.scene.add.existing(this);
    this.config.scene.addCharacter(this);

    let character = this.config.scene.characters.find(char => char.config.id == this.config['seen-character']);
    if (this.ge.isCreated && typeof character === 'undefined') {
      this.ge.addCharacter(this.characterDef());
    }

    // seen-radius config
    this.color = {
      debug: !true,
      normal: 0x1d7196,
      selected: 0xff0000
    };
    this.seenRect = this.config.scene.add
      .rectangle(this.config.x * Tile.Width, this.config.y * Tile.Height, 0, 0, this.color.normal, this.color.debug ? 0.4 : 0);
    this.characterRect = this.config.scene.add
      .rectangle(this.config.x * Tile.Width, this.config.y * Tile.Height, 30, 30, this.color.normal, this.color.debug ? 0.5 : 0);

    this.seenRect.setOrigin(0, 0);
    this.characterRect.setOrigin(0, 0);
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

  characterDef() {
    let def = this.config;
    return {
      id: def.id,
      sprite: this,
      walkingAnimationMapping: this.characterFramesDef(),
      startPosition: { x: def.x, y: def.y },
      facingDirection: def.facingDirection,
      collides: def.collides,
      charLayer: def.charLayer,
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

  lookAt(charId) {
    return this.ge.turnTowards(
      this.config.id,
      this.ge.getFacingPosition(charId)
    );
  }

  move(dir, config) {
    return this.ge.move(this.config.id, dir.toLowerCase(), config);
  }

  moveTo(x, y, config) {
    return this.ge.moveTo(this.config.id, {x:x, y:y}, config);
  }

  stopMovement() {
    return this.ge.stopMovement(this.config.id);
  }

  getFacingDirection() {
    return this.ge.getFacingDirection(this.config.id);
  }

  getPosInFacingDirection() {
    let pos = this.getPosition();
    let dir = this.getFacingDirection();
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
    let pos = this.getPosition();
    let dir = this.getFacingDirection();
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

  handleAutoMoveTiles() {
    if (this.slidingDir !== null) {
      this.move(this.slidingDir);
      return;
    }
    if (this.spinningDir !== null) {
      this.move(this.spinningDir);
      return;
    }
  }

  handleMovement() {
    let allowed = this.config.scene.registry.get('player_input');
    if (this.spinningDir !== null) { allowed = false; }
    if (this.slidingDir !== null) { allowed = false; }
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
    if (this.config.canRun !== true) { return; }

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
    if (this.config.scene.scene.get('Preload').enableAnimations) {
      this.anims.play(this.config.texture+'-spin');
    }
    this.spinningDir = direction;
  }

  stopSpinning() {
    this.ge.setWalkingAnimationMapping(this.config.id, this.characterFramesDef());
    if (this.config.scene.scene.get('Preload').enableAnimations) {
      this.anims.stop();
    }
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
    if (this.initalCreation) {
      let lookDir = this.config['facing-direction'];
      let faceDir = this.getFacingDirection();

      if (faceDir !== lookDir) {
        this.look(lookDir);
        return;
      }
      this.initalCreation = !this.initalCreation;
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

  canSeeCharacter() {
    if (this.config['seen-radius'] === 0) { return; }
    if (this.config['seen-character'] === null) { return; }
    if (this.config['seen-character'].length === 0) { return; }

    if (!this.ge.hasCharacter(this.config['seen-character'])) {
      console.log(this.config['seen-character'], 'ge doesnt has character');
      return;
    }

    let character = this.config.scene.characters.find(char => char.config.id == this.config['seen-character']);
    if (typeof character === 'undefined') {
      console.log(character, this.config['seen-character'], 'gamemap doesnt has character');
      return;
    }

    let npcBounds = this.getBounds();
    let faceDir = this.getPosInFacingDirection();
    let tile;

    // find tiles we need to check
    // check for collision objects
    let count = this.config['seen-radius'];
    for (let i=0; i<this.config['seen-radius']; i++) {
      switch(this.getFacingDirection()) {
        case 'left':
          tile = {x: faceDir.x-i, y: faceDir.y};
        break;
        case 'right':
          tile = {x: faceDir.x+i, y: faceDir.y};
        break;
        case 'up':
          tile = {x: faceDir.x, y: faceDir.y-i};
        break;
        case 'down':
          tile = {x: faceDir.x, y: faceDir.y+i};
        break;
      }
      var props = this.scene.getTileProperties(tile.x, tile.y);
      var check = [
        this.scene.getValue(props, 'ge_collide', false),
        this.scene.getValue(props, 'ge_collide_left', false),
        this.scene.getValue(props, 'ge_collide_right', false),
        this.scene.getValue(props, 'ge_collide_up', false),
        this.scene.getValue(props, 'ge_collide_down', false),
        this.scene.getValue(props, 'sw_stop', false),
        this.scene.getValue(props, 'sw_slide', false),
        this.scene.getValue(props, 'sw_spin', false),
        this.scene.getValue(props, 'sw_jump', false),
      ].includes(true);

      if (check) {
        count = i;
        break;
      }
    }

    // count not being the same as the seen-radius
    // means we hit something with a collision on it
    // so just see everything upto that point
    let seenRadiusOverride = count !== this.config['seen-radius']
      ? count
      : this.config['seen-radius']
    ;

    // 32 here is the tile size
    let seenRadiusInTiles = seenRadiusOverride * 32;

    // calc the actual seen box
    switch(this.getFacingDirection()) {
      case 'left':
        this.seenRect.x = ((faceDir.x+1) * Tile.Width) - seenRadiusInTiles;
        this.seenRect.y = npcBounds.y+8;
        this.seenRect.width = seenRadiusInTiles;
        this.seenRect.height = Tile.Height;
      break;

      case 'right':
        this.seenRect.x = faceDir.x * Tile.Width;
        this.seenRect.y = npcBounds.y+8;
        this.seenRect.width = seenRadiusInTiles;
        this.seenRect.height = Tile.Height;
      break;

      case 'up':
        this.seenRect.x = npcBounds.x;
        this.seenRect.y = ((faceDir.y+1) * Tile.Height) - seenRadiusInTiles;
        this.seenRect.width = Tile.Width;
        this.seenRect.height = seenRadiusInTiles;
      break;

      case 'down':
        this.seenRect.x = npcBounds.x;
        this.seenRect.y = faceDir.y * Tile.Height;
        this.seenRect.width = Tile.Width;
        this.seenRect.height = seenRadiusInTiles;
      break;
    }

    let characterBounds = character.getBounds();

    this.characterRect.x = (characterBounds.x+1) +
      (character.config.type === 'pkmn' ? 16 : 0);
    this.characterRect.y = (characterBounds.y+1) +
      (character.config.type === 'pkmn' ? 32 : 8);

    let isInside = Phaser.Geom.Rectangle.ContainsPoint(this.seenRect, this.characterRect);
    if (isInside) {
      // console.log(this.config.id +' can see '+character.config.id+'!');
    }
    this.seenRect.fillColor = isInside ? this.color.selected : this.color.normal;
  }
}
