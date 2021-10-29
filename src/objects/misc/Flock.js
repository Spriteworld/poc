import Phaser from 'phaser';

export default class extends Phaser.GameObjects.Container {
  constructor(scene, name, pokeId, x, y, dir, grid) {
    super(scene, x, y);
    this.scene = scene;
    this.name = name;
    this.pokeId = pokeId;
    this.direction = dir;
    this.grid = grid;

    this.active = true;
    this.mon = [];

    let pkmnObj = {
      scene: this.scene,
      'facing-direction': this.direction.toLowerCase(),
      'spin': false,
      'char-layer': 'sky',
      'can-run': false,
      collides: false,
    };

    this.generateMon(pkmnObj);
    this.sortMon();

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

  sortMon() {
    switch(this.direction.toLowerCase()) {
      case 'left':
      case 'right':
        this.mon = this.mon.sort((a, b) => a.x == b.x ? a.y - b.y : a.x - b.x);
        if (this.direction === 'right') { this.mon = this.mon.reverse(); }
      break;
      case 'down':
      case 'up':
        this.mon = this.mon.sort((a, b) => a.y == b.y ? a.x - b.x : a.y - b.y);
        if (this.direction === 'down') { this.mon = this.mon.reverse(); }
      break;
    }
  }

  generateMon(pkmnObj) {
    let mon = [];

    // counter for id increment
    var counter = 0;

    // increments the y value
    var y_counter = this.y;
    this.grid.forEach(row => {
      // increments the x value
      var x_counter = this.x;
      row.forEach(enabled => {
        if (enabled) {
          mon.push(this.scene.addMonToScene(this.pokeId, x_counter, y_counter, {
            ...pkmnObj, ...{id: 'flock_'+this.name+'_'+counter}
          }));
          counter++;
        }
        x_counter++;
      });
      y_counter++;
    });

    this.mon = mon;
  }

}
