import {GameMap} from '@Scenes';
import {TestMap} from '@Maps';
import {PkmnOverworld} from '@Objects';
import { STATS } from '@pokelinkapp/pokemon-data';
import { GROWTH, NATURES, BasePokemon } from '@pokelinkapp/pokemon-data/src/pokemon';

export default class extends GameMap {
  constructor() {
    super({
      mapName: 'Test',
      map: TestMap
    });
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
  }

  update(time, delta) {
    this.updateCharacters(time, delta);

    let npcPos = this.npc1.getPosition();
    if (npcPos.x == 7 && npcPos.y == 21) {
      this.npc1.moveTo(4, 20);
    }
  }

}
