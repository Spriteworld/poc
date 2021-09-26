import { definitions } from '@Data';

var calcStat = function(pokemon, stat) {
  let Level = pokemon.level || 1;
  let Nature = pokemon.nature || definitions.nature.HARDY.name;
  let BaseIvEv = pokemon.baseStats[stat] + pokemon.ivs[stat] + pokemon.evs[stat];

  let NatureCalc = 1;
  if (definitions.nature[Nature].increase === stat) {
    NatureCalc = 1.1;
  }
  if (definitions.nature[Nature].decrease === stat) {
    NatureCalc = 0.9;
  }

  if (stat === 'HP') {
    return Math.floor((2 * BaseIvEv) * Level / 100 + Level + 10);
  }

  return Math.floor(Math.floor((2 * BaseIvEv) * Level / 100 + 5) * NatureCalc);
}
export { calcStat };
