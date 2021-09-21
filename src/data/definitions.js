export const evolution = {
  // levels up with friendship ≥ 220
  FRIENDSHIP: "friendship",
  // levels up during the day with friendship ≥ 220
  FRIENDSHIP_DAY: "friendship_day",
  // levels up at night with friendship ≥ 220
  FRIENDSHIP_NIGHT: "friendship_night",
  // Pokemon reaches the specified level
  LEVEL: "level",
  // Pokemon is traded
  TRADE: "trade",
  // Pokemon is traded while it's holding the specified item
  TRADE_ITEM: "trade_item",
  // specified item is used on Pokemon
  ITEM: "item",
  // Pokemon reaches the specified level with attack > defense
  LEVEL_ATK_GT_DEF: "level_atk_gt_def",
  // Pokemon reaches the specified level with attack = defense
  LEVEL_ATK_EQ_DEF: "level_atk_eq_def",
  // Pokemon reaches the specified level with attack < defense
  LEVEL_ATK_LT_DEF: "level_atk_lt_def",
  // Pokemon reaches the specified level with a Silcoon personality value
  LEVEL_SILCOON: "level_silcoon",
  // Pokemon reaches the specified level with a Cascoon personality value
  LEVEL_CASCOON: "level_cascoon",
  // Pokemon reaches the specified level (special value for Ninjask)
  LEVEL_NINJASK: "level_ninjask",
  // Pokemon reaches the specified level (special value for Shedinja)
  LEVEL_SHEDINJA: "level_shedinja",
  // Pokemon levels up with beauty ≥ specified value
  BEAUTY: "beauty",
};

export const color = {
  RED: "red",
  BLUE: "blue",
  YELLOW: "yellow",
  GREEN: "green",
  BLACK: "black",
  BROWN: "brown",
  PURPLE: "purple",
  GRAY: "gray",
  WHITE: "white",
  PINK: "pink"
};

export const growth = {
  MEDIUM_FAST: "medium_fast",
  ERRATIC: "erratic",
  FLUCTUATING: "fluctuating",
  MEDIUM_SLOW: "medium_slow",
  FAST: "fast",
  SLOW: "slow",
};

export const stats = {
  ATTACK: "attack",
  DEFENSE: "defense",
  SPECIAL_ATTACK: "special_attack",
  SPECIAL_DEFENSE: "special_defense",
  SPEED: "speed",
};

export const nature = {
  HARDY: { increase: stats.ATTACK, decrease: stats.ATTACK },
  LONELY: { increase: stats.ATTACK, decrease: stats.DEFENSE },
  BRAVE: { increase: stats.ATTACK, decrease: stats.SPEED },
  ADAMANT: { increase: stats.ATTACK, decrease: stats.SPECIAL_ATTACK },
  NAUGHTY: { increase: stats.ATTACK, decrease: stats.SPECIAL_DEFENSE },
  BOLD: { increase: stats.DEFENSE, decrease: stats.ATTACK },
  DOCILE: { increase: stats.DEFENSE, decrease: stats.DEFENSE },
  RELAXED: { increase: stats.DEFENSE, decrease: stats.SPEED },
  IMPISH: { increase: stats.DEFENSE, decrease: stats.SPECIAL_ATTACK },
  LAX: { increase: stats.DEFENSE, decrease: stats.SPECIAL_DEFENSE },
  TIMID: { increase: stats.SPEED, decrease: stats.ATTACK },
  HASTY: { increase: stats.SPEED, decrease: stats.DEFENSE },
  SERIOUS: { increase: stats.SPEED, decrease: stats.SPEED },
  JOLLY: { increase: stats.SPEED, decrease: stats.SPECIAL_ATTACK },
  NAIVE: { increase: stats.SPEED, decrease: stats.SPECIAL_DEFENSE },
  MODEST: { increase: stats.SPECIAL_ATTACK, decrease: stats.ATTACK },
  MILD: { increase: stats.SPECIAL_ATTACK, decrease: stats.DEFENSE },
  QUIET: { increase: stats.SPECIAL_ATTACK, decrease: stats.SPEED },
  BASHFUL: { increase: stats.SPECIAL_ATTACK, decrease: stats.SPECIAL_ATTACK },
  RASH: { increase: stats.SPECIAL_ATTACK, decrease: stats.SPECIAL_DEFENSE },
  CALM: { increase: stats.SPECIAL_DEFENSE, decrease: stats.ATTACK },
  GENTLE: { increase: stats.SPECIAL_DEFENSE, decrease: stats.DEFENSE },
  SASSY: { increase: stats.SPECIAL_DEFENSE, decrease: stats.SPEED },
  CAREFUL: { increase: stats.SPECIAL_DEFENSE, decrease: stats.SPECIAL_ATTACK },
  QUIRKY: { increase: stats.SPECIAL_DEFENSE, decrease: stats.SPECIAL_DEFENSE },
};

export const weather = {
  SUN: "sun",
  RAIN: "rain",
  SANDSTORM: "sandstorm",
  HAIL: "hail",
  NONE: "none"
};

export const status = {
  SLEEP: "sleep",
  POISON: "poisoned",
  BURN: "burned",
  FROZEN: "frozen",
  PARALYZE: "paralyzed",
  TOXIC: "toxic",
};


export const form = {
  REGIONAL: {
    ALOLA: "alolan",
    GALAR: "galarian",
    HISUI: "hisuian",
  }
};

