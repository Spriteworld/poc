import { definitions } from '@Data';

var calcStat = function(pokemon, stat) {
  let level = pokemon.level || 1;
  let nature = (pokemon.nature || definitions.NATURE.HARDY.name).toUpperCase();
  let baseIvEv = pokemon.baseStats[stat] + pokemon.ivs[stat] + pokemon.evs[stat];

  let natureCalc = 1;
  if (definitions.NATURE[nature].increase === stat) {
    natureCalc = 1.1;
  }
  if (definitions.NATURE[nature].decrease === stat) {
    natureCalc = 0.9;
  }

  if (stat === 'HP') {
    return Math.floor((2 * baseIvEv) * level / 100 + Level + 10);
  }

  return Math.floor(Math.floor((2 * baseIvEv) * level / 100 + 5) * natureCalc);
}
export { calcStat };
