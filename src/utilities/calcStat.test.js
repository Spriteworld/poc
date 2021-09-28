import {calcStat} from '@Utilities';

let pokemon = {
  species: 12,
  speciesName: 'butterfree',
  level: 53,
  nature: 'modest',
  baseStats: {
    hp: 60,
    atk: 45,
    def: 50,
    spatk: 80,
    spdef: 80,
    spd: 70,
  },
  ivs: {
    hp: 28,
    atk: 4,
    def: 17,
    spatk: 30,
    spdef: 27,
    spd: 31,
  },
  evs: {
    hp: 4,
    atk: 0,
    def: 0,
    spatk: 254,
    spdef: 0,
    spd: 252,
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

describe('calcStat should generate correct stats given known info', () => {

  test('hp', () => {
    let stat = 'hp';
    expect(calcStat(pokemon, stat)).toBe(expected[stat]);
  });

  test('atk', () => {
    let stat = 'atk';
    expect(calcStat(pokemon, stat)).toEqual(expected[stat]);
  });

  test('def', () => {
    let stat = 'def';
    expect(calcStat(pokemon, stat)).toEqual(expected[stat]);
  });

  test('spatk', () => {
    let stat = 'spatk';
    expect(calcStat(pokemon, stat)).toEqual(expected[stat]);
  });

  test('spdef', () => {
    let stat = 'spdef';
    expect(calcStat(pokemon, stat)).toEqual(expected[stat]);
  });

  test('spd', () => {
    let stat = 'spd';
    expect(calcStat(pokemon, stat)).toEqual(expected[stat]);
  });
});
