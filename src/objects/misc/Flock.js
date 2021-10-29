import Phaser from 'phaser';

export default class extends Phaser.GameObjects.Container {
  constructor(scene, name, pokeId, x, y, dir) {
    super(scene, x, y);
    this.scene = scene;
    this.name = name;
    this.pokeId = pokeId;
    this.direction = dir;

    this.active = true;
    this.mon = [];

    let pkmnObj = {
      scene: this.scene,
      'facing-direction': this.direction,
      'spin': false,
      'charLayer': 'sky',
      canRun: false,
      collides: false,
    };

    this.generateV(pkmnObj);

    // reorder the pokemon based on coords
    switch(this.direction.toLowerCase()) {
      case 'left':
      case 'right':
        this.mon = this.mon.sort((a, b) => a.x == b.x ? a.y - b.y : a.x - b.x);
        if (dir === 'right') { this.mon = this.mon.reverse(); }
      break;
      case 'down':
      case 'up':
        this.mon = this.mon.sort((a, b) => a.y == b.y ? a.x - b.x : a.y - b.y);
        if (dir === 'down') { this.mon = this.mon.reverse(); }
      break;
    }

    this.scene.add.existing(this);
  }

  update(time, delta) {
    Object.values(this.mon).forEach(mon => {
      if (mon.visible) {
        let pos = mon.getPosition();
        if ([0, this.scene.config.tilemap.width-1].includes(pos.x)
          || [0, this.scene.config.tilemap.height-1].includes(pos.y)) {

          mon.setVisible(false);
          mon.move(this.direction);

          // no mon are visible, disable this flock
          if (this.mon.every(mon => !mon.visible)) {
            this.active = false;
          }
        } else {
          mon.move(this.direction);
        }
      }
    });
  }

  generateV(pkmnObj) {
    this.mon.push(this.scene.addMonToScene(this.pokeId, this.x+2, this.y-2, {
      ...pkmnObj, ...{id: 'flock_'+this.name+'_1'}
    }));
    this.mon.push(this.scene.addMonToScene(this.pokeId, this.x+1, this.y-1, {
      ...pkmnObj, ...{id: 'flock_'+this.name+'_2'}
    }));
    this.mon.push(this.scene.addMonToScene(this.pokeId, this.x, this.y, {
      ...pkmnObj, ...{id: 'flock_'+this.name+'_3'}
    }));
    this.mon.push(this.scene.addMonToScene(this.pokeId, this.x+1, this.y+1, {
      ...pkmnObj, ...{id: 'flock_'+this.name+'_4'}
    }));
    this.mon.push(this.scene.addMonToScene(this.pokeId, this.x+2, this.y+2, {
      ...pkmnObj, ...{id: 'flock_'+this.name+'_5'}
    }));
  }

}
