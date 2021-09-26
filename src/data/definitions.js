export const evolution = {
  // levels up with friendship ≥ 220
  FRIENDSHIP: 'friendship',
  // levels up during the day with friendship ≥ 220
  FRIENDSHIP_DAY: 'friendship_day',
  // levels up at night with friendship ≥ 220
  FRIENDSHIP_NIGHT: 'friendship_night',
  // Pokemon reaches the specified level
  LEVEL: 'level',
  // Pokemon is traded
  TRADE: 'trade',
  // Pokemon is traded while it's holding the specified item
  TRADE_ITEM: 'trade_item',
  // specified item is used on Pokemon
  ITEM: 'item',
  // Pokemon reaches the specified level with attack > defense
  LEVEL_ATK_GT_DEF: 'level_atk_gt_def',
  // Pokemon reaches the specified level with attack = defense
  LEVEL_ATK_EQ_DEF: 'level_atk_eq_def',
  // Pokemon reaches the specified level with attack < defense
  LEVEL_ATK_LT_DEF: 'level_atk_lt_def',
  // Pokemon reaches the specified level with a Silcoon personality value
  LEVEL_SILCOON: 'level_silcoon',
  // Pokemon reaches the specified level with a Cascoon personality value
  LEVEL_CASCOON: 'level_cascoon',
  // Pokemon reaches the specified level (special value for Ninjask)
  LEVEL_NINJASK: 'level_ninjask',
  // Pokemon reaches the specified level (special value for Shedinja)
  LEVEL_SHEDINJA: 'level_shedinja',
  // Pokemon levels up with beauty ≥ specified value
  BEAUTY: 'beauty',
};

export const color = {
  RED: 'red',
  BLUE: 'blue',
  YELLOW: 'yellow',
  GREEN: 'green',
  BLACK: 'black',
  BROWN: 'brown',
  PURPLE: 'purple',
  GRAY: 'gray',
  WHITE: 'white',
  PINK: 'pink'
};

export const growth = {
  MEDIUM_FAST: 'medium_fast',
  ERRATIC: 'erratic',
  FLUCTUATING: 'fluctuating',
  MEDIUM_SLOW: 'medium_slow',
  FAST: 'fast',
  SLOW: 'slow',
};

export const stats = {
  HP: 'hp',
  ATTACK: 'atk',
  DEFENSE: 'def',
  SPECIAL_ATTACK: 'spatk',
  SPECIAL_DEFENSE: 'spdef',
  SPEED: 'apd',
};

export const weather = {
  SUN: 'sun',
  RAIN: 'rain',
  SANDSTORM: 'sandstorm',
  HAIL: 'hail',
  NONE: 'none'
};

export const status = {
  SLEEP: 'sleep',
  POISON: 'poisoned',
  BURN: 'burned',
  FROZEN: 'frozen',
  PARALYZE: 'paralyzed',
  TOXIC: 'toxic',
};


export const form = {
  REGIONAL: {
    ALOLA: 'alolan',
    GALAR: 'galarian',
    HISUI: 'hisuian',
  }
};

export const nature = {
  HARDY: {
    name: 'hardy',
    increase: stats.ATTACK,
    decrease: stats.ATTACK
  },
  LONELY: {
    name: 'lonely',
    increase: stats.ATTACK,
    decrease: stats.DEFENSE
  },
  BRAVE: {
    name: 'brave',
    increase: stats.ATTACK,
    decrease: stats.SPEED
  },
  ADAMANT: {
    name: 'adamant',
    increase: stats.ATTACK,
    decrease: stats.SPECIAL_ATTACK
  },
  NAUGHTY: {
    name: 'naughty',
    increase: stats.ATTACK,
    decrease: stats.SPECIAL_DEFENSE
  },
  BOLD: {
    name: 'bold',
    increase: stats.DEFENSE,
    decrease: stats.ATTACK
  },
  DOCILE: {
    name: 'docile',
    increase: stats.DEFENSE,
    decrease: stats.DEFENSE
  },
  RELAXED: {
    name: 'relaxed',
    increase: stats.DEFENSE,
    decrease: stats.SPEED
  },
  IMPISH: {
    name: 'impish',
    increase: stats.DEFENSE,
    decrease: stats.SPECIAL_ATTACK
  },
  LAX: {
    name: 'lax',
    increase: stats.DEFENSE,
    decrease: stats.SPECIAL_DEFENSE
  },
  TIMID: {
    name: 'timid',
    increase: stats.SPEED,
    decrease: stats.ATTACK
  },
  HASTY: {
    name: 'hasty',
    increase: stats.SPEED,
    decrease: stats.DEFENSE
  },
  SERIOUS: {
    name: 'serious',
    increase: stats.SPEED,
    decrease: stats.SPEED
  },
  JOLLY: {
    name: 'jolly',
    increase: stats.SPEED,
    decrease: stats.SPECIAL_ATTACK
  },
  NAIVE: {
    name: 'naive',
    increase: stats.SPEED,
    decrease: stats.SPECIAL_DEFENSE
  },
  MODEST: {
    name: 'modest',
    increase: stats.SPECIAL_ATTACK,
    decrease: stats.ATTACK
  },
  MILD: {
    name: 'mild',
    increase: stats.SPECIAL_ATTACK,
    decrease: stats.DEFENSE
  },
  QUIET: {
    name: 'quiet',
    increase: stats.SPECIAL_ATTACK,
    decrease: stats.SPEED
  },
  BASHFUL: {
    name: 'bashful',
    increase: stats.SPECIAL_ATTACK,
    decrease: stats.SPECIAL_ATTACK
  },
  RASH: {
    name: 'rash',
    increase: stats.SPECIAL_ATTACK,
    decrease: stats.SPECIAL_DEFENSE
  },
  CALM: {
    name: 'calm',
    increase: stats.SPECIAL_DEFENSE,
    decrease: stats.ATTACK
  },
  GENTLE: {
    name: 'gentle',
    increase: stats.SPECIAL_DEFENSE,
    decrease: stats.DEFENSE
  },
  SASSY: {
    name: 'sassy',
    increase: stats.SPECIAL_DEFENSE,
    decrease: stats.SPEED
  },
  CAREFUL: {
    name: 'careful',
    increase: stats.SPECIAL_DEFENSE,
    decrease: stats.SPECIAL_ATTACK
  },
  QUIRKY: {
    name: 'quirky',
    increase: stats.SPECIAL_DEFENSE,
    decrease: stats.SPECIAL_DEFENSE
  },
};

export const types = {
  NORMAL: {
    name: 'normal',
    immunity: ['ghost'],
    weakness: ['rock', 'steel'],
    strength: []
  },
  FIRE: {
    name: 'fire',
    immunity: [],
    weakness: ['fire', 'water', 'rock', 'dragon'],
    strength: ['grass', 'ice', 'bug', 'steel']
  },
  WATER: {
    name: 'water',
    immunity: [],
    weakness: ['water', 'grass', 'dragon'],
    strength: ['fire', 'ground', 'rock']
  },
  ELECTRIC: {
    name: 'electric',
    immunity: ['ground'],
    weakness: ['electric', 'grass', 'dragon'],
    strength: ['water', 'flying']
  },
  GRASS: {
    name: 'grass',
    immunity: [],
    weakness: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
    strength: ['water', 'ground', 'rock']
  },
  ICE: {
    name: 'ice',
    immunity: [],
    weakness: ['fire', 'water', 'ice', 'steel'],
    strength: ['grass', 'ground', 'flying', 'dragon']
  },
  FIGHTING: {
    name: 'fighting',
    immunity: ['ghost'],
    weakness: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
    strength: ['normal', 'ice', 'rock', 'dark', 'steel']
  },
  POISON: {
    name: 'poison',
    immunity: ['steel'],
    weakness: ['poison', 'ground', 'rock', 'ghost'],
    strength: ['grass', 'fairy']
  },
  GROUND: {
    name: 'ground',
    immunity: ['flying'],
    weakness: ['grass', 'bug'],
    strength: ['fire', 'electric', 'poison', 'rock', 'steel']
  },
  FLYING: {
    name: 'flying',
    immunity: [],
    weakness: ['electric', 'rock', 'steel'],
    strength: ['grass', 'fighting', 'bug']
  },
  PSYCHIC: {
    name: 'psychic',
    immunity: ['dark'],
    weakness: ['psychic', 'steel'],
    strength: ['fighting', 'poison']
  },
  BUG: {
    name: 'bug',
    immunity: [],
    weakness: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'],
    strength: ['grass', 'psychic', 'dark']
  },
  ROCK: {
    name: 'rock',
    immunity: [],
    weakness: ['fighting', 'ground', 'steel'],
    strength: ['fire', 'ice', 'flying', 'bug']
  },
  GHOST: {
    name: 'ghost',
    immunity: ['normal'],
    weakness: ['dark'],
    strength: ['psychic', 'ghost']
  },
  DRAGON: {
    name: 'dragon',
    immunity: ['fairy'],
    weakness: ['steel'],
    strength: ['dragon']
  },
  DARK: {
    name: 'dark',
    immunity: [],
    weakness: ['fighting', 'dark', 'fairy'],
    strength: ['psychic', 'ghost']
  },
  STEEL: {
    name: 'steel',
    immunity: [],
    weakness: ['fire', 'water', 'electric', 'steel'],
    strength: ['ice', 'rock', 'fairy']
  },
  FAIRY: {
    name: 'fairy',
    immunity: [],
    weakness: ['fire', 'poison', 'steel'],
    strength: ['fighting', 'dragon', 'dark']
  }
};
