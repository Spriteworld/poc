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

    // console.log([this.config.tilemap.width, this.config.tilemap.height]);
    // this.spawnFlock('fearow', '022', 33, 14, 'down');
  }

  update(time, delta) {
    this.updateCharacters(time, delta);

    let npcPos = this.npc1.getPosition();
    if (npcPos.x == 7 && npcPos.y == 21) {
      this.npc1.moveTo(4, 20);
    }


    // Object.values(this.flocks)
    //   .filter(flock => flock.active)
    //   .forEach(flock => {
    //     Object.values(flock.mon).forEach(mon => {
    //       if (mon.visible) {
    //         // console.log(mon.config.id);
    //         let pos = mon.getPosition();
    //         if ([0, this.config.tilemap.width-1].includes(pos.x)
    //           || [0, this.config.tilemap.height-1].includes(pos.y)) {

    //           mon.setVisible(false);
    //           mon.move(flock.direction);

    //           // no mon are visible, disable this flock
    //           if (flock.mon.every(mon => !mon.visible)) {
    //             console.log('no mon visible, flock gets disabled');
    //             flock.active = false;
    //           }
    //         } else {
    //         // console.log(pos.x, pos.y, '...moving');
    //           mon.move(flock.direction);
    //         }
    //       }
    //     });
    //   });
  }

  spawnFlock(name, poke, x, y, dir) {
    let pkmnObj = {
      scene: this,
      'facing-direction': dir,
      'spin': false,
      'charLayer': 'sky',
      canRun: false,
      colides: false,
    };

    let mon = [];
    mon.push(this.addMonToScene(poke, x+2, y-2, {...pkmnObj, ...{id: 'flock_'+name+'_1'}}));
    mon.push(this.addMonToScene(poke, x+1, y-1, {...pkmnObj, ...{id: 'flock_'+name+'_2'}}));
    mon.push(this.addMonToScene(poke, x, y, {...pkmnObj, ...{id: 'flock_'+name+'_3'}}));
    mon.push(this.addMonToScene(poke, x+1, y+1, {...pkmnObj, ...{id: 'flock_'+name+'_4'}}));
    mon.push(this.addMonToScene(poke, x+2, y+2, {...pkmnObj, ...{id: 'flock_'+name+'_5'}}));

    // reorder the pokemon based on coords
    console.log('unsroted', mon.map(pkmn => pkmn.config.id));
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

  findMonsFlock(mon) {
    let test = Object.values(this.flocks).findIndex(flock => {
      return flock.mon.some(flockmon => flockmon.id === mon);
    });
    // console.log('test', test);
  }

}
