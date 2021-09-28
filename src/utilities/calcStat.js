import { definitions } from '@Data';

var calcStat = function(pokemon, stat) {
  let level = pokemon.level || 1;
  if (level > 100) {
    level = 100;
  }
  let nature = (pokemon.nature || definitions.NATURE.HARDY.name).toUpperCase();
  let baseIvEv = 2 * pokemon.baseStats[stat]
                    + pokemon.ivs[stat]
                    + (pokemon.evs[stat] / 4);

  let natureCalc = 1;
  if (definitions.NATURE[nature].increase === stat) {
    natureCalc = 1.1;
  }
  if (definitions.NATURE[nature].decrease === stat) {
    natureCalc = 0.9;
  }

  if (stat === definitions.STATS.HP) {
    return Math.floor(baseIvEv * level / 100 + level + 10);
  }

  return Math.floor(Math.floor(baseIvEv * level / 100 + 5) * natureCalc);
}
export { calcStat };
