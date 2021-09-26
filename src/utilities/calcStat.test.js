import { calcStat } from './calcStat.js';

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

test('calcStat generated correct hp', () => {
  let stat = 'hp';
  expect(calcStat(pokemon, stat)).toBe(expected[stat]);
});

test('calcStat generated correct atk', () => {
  let stat = 'atk';
  expect(calcStat(pokemon, stat)).toBe(expected[stat]);
});

test('calcStat generated correct def', () => {
  let stat = 'def';
  expect(calcStat(pokemon, stat)).toBe(expected[stat]);
});

test('calcStat generated correct spatk', () => {
  let stat = 'spatk';
  expect(calcStat(pokemon, stat)).toBe(expected[stat]);
});

test('calcStat generated correct spdef', () => {
  let stat = 'spdef';
  expect(calcStat(pokemon, stat)).toBe(expected[stat]);
});

test('calcStat generated correct spd', () => {
  let stat = 'spd';
  expect(calcStat(pokemon, stat)).toBe(expected[stat]);
});
