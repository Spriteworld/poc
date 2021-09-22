export const POKEMON_TYPE = {
    BUG = "bug",
    DARK = "dark",
    DRAGON = "dragon",
    ELECTRIC = "electric",
    FAIRY = "fairy",
    FIGHTING = "fighting",
    FIRE = "fire",
    FLYING = "flying",
    GHOST = "ghost",
    GRASS = "grass",
    GROUND = "ground",
    ICE = "ice",
    NORMAL = "normal",
    POISON = "poison",
    PSYCHIC = "psychic",
    ROCK = "rock",
    STEEL = "steel",
    WATER = "water"
}
export const EVOLUTION_TYPE = {
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

export const COLOR = {
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

export const GROWTH = {
    MEDIUM_FAST: "medium_fast",
    ERRATIC: "erratic",
    FLUCTUATING: "fluctuating",
    MEDIUM_SLOW: "medium_slow",
    FAST: "fast",
    SLOW: "slow",
};