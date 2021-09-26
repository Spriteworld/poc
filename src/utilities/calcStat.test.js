import { calcStat } from './calcStat.js';

test('calcStat generates correct numbers given test data', () => {
  let pokemon = {
    species: 12,
    speciesName: 'butterfree',
    level: 53,
    nature: 'modest',
    baseStats: {
      atk: 45,
      def: 50,
      spd: 70,
      spatk: 90,
      spdef: 80,
      hp: 60
    },
    ivs: {
      atk: 4,
      def: 17,
      spd: 31,
      spatk: 30,
      spdef: 27,
      hp: 28
    },
    evs: {
      atk: 0,
      def: 0,
      spd: 252,
      spatk: 254,
      spdef: 0,
      hp: 4
    },
  };
  let expected = {
    hp: 141,
    atk: 48,
    def: 67,
    spatk: 152,
    spdef: 104,
    spd: 129,
  };

  Object.keys(expected).forEach(stat => {
    expect(calcStat(pokemon, stat)).toBe(expected[stat]);
  });
});
