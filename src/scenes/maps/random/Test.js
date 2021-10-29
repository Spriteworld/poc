import {GameMap} from '@Objects';
import {TestMap} from '@Maps';

export default class extends GameMap {
  constructor() {
    super({
      mapName: 'Test',
      map: TestMap
    });

    this.flocks = [];
  }

  preload() {
    this.preloadMap();
  }

  create () {
    this.loadMap();

    this.npc1 = this.addNPCToScene('bob', 'poke_kid', 7, 21);

    this.createCharacters();

    this.gridEngine
      .positionChangeFinished()
      .subscribe(({ charId, exitTile, enterTile }) => {
        if (![this.npc1.config.id].includes(charId)) {
          return;
        }

        let npcPos = this.npc1.getPosition();
        if (npcPos.x == 10 && npcPos.y == 21) {
          this.npc1.moveTo(4, 20, {
            noPathFoundStrategy: 'RETRY'
          });
        }
      });

    // flocks!
    // this.gridEngine
    //   .positionChangeFinished()
    //   .subscribe(({ charId, exitTile, enterTile }) => {
    //     if (!Object.values(this.flocks).length) { return; }

    //     this.findMonsFlock(charId);
    //   });

    this.spawnFlock('fearow', '022', 1, 14, 'right');
  }

  update(time, delta) {
    this.updateCharacters(time, delta);

    let npcPos = this.npc1.getPosition();
    if (npcPos.x == 7 && npcPos.y == 21) {
      this.npc1.moveTo(4, 20);
    }

    Object.values(this.flocks)
      .filter(flock => flock.active)
      .forEach(flock => {
        Object.values(flock.mon).forEach(mon => {
          if (mon.visible) {
            let pos = mon.getPosition();
            if ([0, this.config.tilemap.width-1].includes(pos.x)
              || [0, this.config.tilemap.height-1].includes(pos.y)) {

              mon.setVisible(false);
              mon.move(flock.direction);

              // no mon are visible, disable this flock
              if (flock.mon.every(mon => !mon.visible)) {
                flock.active = false;
              }
            } else {
              mon.move(flock.direction);
            }
          }
        });
      });
  }

  spawnFlock(name, poke, x, y, dir) {
    let pkmnObj = {
      scene: this,
      'facing-direction': dir,
      'spin': false,
      'charLayer': 'sky',
      canRun: false,
      collides: false,
    };

    let mon = [];
    mon.push(this.addMonToScene(poke, x+2, y-2, {...pkmnObj, ...{id: 'flock_'+name+'_1'}}));
    mon.push(this.addMonToScene(poke, x+1, y-1, {...pkmnObj, ...{id: 'flock_'+name+'_2'}}));
    mon.push(this.addMonToScene(poke, x, y, {...pkmnObj, ...{id: 'flock_'+name+'_3'}}));
    mon.push(this.addMonToScene(poke, x+1, y+1, {...pkmnObj, ...{id: 'flock_'+name+'_4'}}));
    mon.push(this.addMonToScene(poke, x+2, y+2, {...pkmnObj, ...{id: 'flock_'+name+'_5'}}));

    // reorder the pokemon based on coords
    switch(dir) {
      case 'left':
      case 'right':
        mon = mon.sort((a, b) => a.x == b.x ? a.y - b.y : a.x - b.x);
        if (dir === 'right') { mon = mon.reverse(); }
      break;
      case 'down':
      case 'up':
        mon = mon.sort((a, b) => a.y == b.y ? a.x - b.x : a.y - b.y);
        if (dir === 'down') { mon = mon.reverse(); }
      break;
    }

    // add everything to the flock
    this.flocks.push({
      name: name,
      mon: mon,
      direction: dir,
      coords: {x: x, y: y},
      active: true,
    });
  }

}
