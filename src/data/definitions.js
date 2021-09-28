export const EVOLUTION = {
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

export const COLOR = {
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

export const GROWTH = {
  MEDIUM_FAST: 'medium_fast',
  ERRATIC: 'erratic',
  FLUCTUATING: 'fluctuating',
  MEDIUM_SLOW: 'medium_slow',
  FAST: 'fast',
  SLOW: 'slow',
};

export const STATS = {
  HP: 'hp',
  ATTACK: 'atk',
  DEFENSE: 'def',
  SPECIAL_ATTACK: 'spatk',
  SPECIAL_DEFENSE: 'spdef',
  SPEED: 'apd',
};

export const WEATHER = {
  SUN: 'sun',
  RAIN: 'rain',
  SANDSTORM: 'sandstorm',
  HAIL: 'hail',
  NONE: 'none'
};

export const STATUS = {
  SLEEP: 'sleep',
  POISON: 'poisoned',
  BURN: 'burned',
  FROZEN: 'frozen',
  PARALYZE: 'paralyzed',
  TOXIC: 'toxic',
};


export const FORM = {
  REGIONAL: {
    ALOLA: 'alolan',
    GALAR: 'galarian',
    HISUI: 'hisuian',
  }
};

export const NATURE = {
  HARDY: {
    name: 'hardy',
    increase: STATS.ATTACK,
    decrease: STATS.ATTACK
  },
  LONELY: {
    name: 'lonely',
    increase: STATS.ATTACK,
    decrease: STATS.DEFENSE
  },
  BRAVE: {
    name: 'brave',
    increase: STATS.ATTACK,
    decrease: STATS.SPEED
  },
  ADAMANT: {
    name: 'adamant',
    increase: STATS.ATTACK,
    decrease: STATS.SPECIAL_ATTACK
  },
  NAUGHTY: {
    name: 'naughty',
    increase: STATS.ATTACK,
    decrease: STATS.SPECIAL_DEFENSE
  },
  BOLD: {
    name: 'bold',
    increase: STATS.DEFENSE,
    decrease: STATS.ATTACK
  },
  DOCILE: {
    name: 'docile',
    increase: STATS.DEFENSE,
    decrease: STATS.DEFENSE
  },
  RELAXED: {
    name: 'relaxed',
    increase: STATS.DEFENSE,
    decrease: STATS.SPEED
  },
  IMPISH: {
    name: 'impish',
    increase: STATS.DEFENSE,
    decrease: STATS.SPECIAL_ATTACK
  },
  LAX: {
    name: 'lax',
    increase: STATS.DEFENSE,
    decrease: STATS.SPECIAL_DEFENSE
  },
  TIMID: {
    name: 'timid',
    increase: STATS.SPEED,
    decrease: STATS.ATTACK
  },
  HASTY: {
    name: 'hasty',
    increase: STATS.SPEED,
    decrease: STATS.DEFENSE
  },
  SERIOUS: {
    name: 'serious',
    increase: STATS.SPEED,
    decrease: STATS.SPEED
  },
  JOLLY: {
    name: 'jolly',
    increase: STATS.SPEED,
    decrease: STATS.SPECIAL_ATTACK
  },
  NAIVE: {
    name: 'naive',
    increase: STATS.SPEED,
    decrease: STATS.SPECIAL_DEFENSE
  },
  MODEST: {
    name: 'modest',
    increase: STATS.SPECIAL_ATTACK,
    decrease: STATS.ATTACK
  },
  MILD: {
    name: 'mild',
    increase: STATS.SPECIAL_ATTACK,
    decrease: STATS.DEFENSE
  },
  QUIET: {
    name: 'quiet',
    increase: STATS.SPECIAL_ATTACK,
    decrease: STATS.SPEED
  },
  BASHFUL: {
    name: 'bashful',
    increase: STATS.SPECIAL_ATTACK,
    decrease: STATS.SPECIAL_ATTACK
  },
  RASH: {
    name: 'rash',
    increase: STATS.SPECIAL_ATTACK,
    decrease: STATS.SPECIAL_DEFENSE
  },
  CALM: {
    name: 'calm',
    increase: STATS.SPECIAL_DEFENSE,
    decrease: STATS.ATTACK
  },
  GENTLE: {
    name: 'gentle',
    increase: STATS.SPECIAL_DEFENSE,
    decrease: STATS.DEFENSE
  },
  SASSY: {
    name: 'sassy',
    increase: STATS.SPECIAL_DEFENSE,
    decrease: STATS.SPEED
  },
  CAREFUL: {
    name: 'careful',
    increase: STATS.SPECIAL_DEFENSE,
    decrease: STATS.SPECIAL_ATTACK
  },
  QUIRKY: {
    name: 'quirky',
    increase: STATS.SPECIAL_DEFENSE,
    decrease: STATS.SPECIAL_DEFENSE
  },
};

export const TYPES = {
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
