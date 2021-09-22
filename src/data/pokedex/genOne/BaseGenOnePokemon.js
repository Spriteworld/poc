import { BasePokedexEntry } from "../BasePokedexEntry";

export class BaseGenOnePokemon extends BasePokedexEntry{
    constructor(id, species, dex_desc, base_stats, types, evolution, abilities, colour, form, weight, height, genders, capture_rate, growth, base_exp_yield, base_egg_steps, effort_yield, egg_groups, learn_set, learn_moves, spawn_items){
        super(id, species, dex_desc, base_stats, types, evolution, abilities, colour, form, weight, height, genders, capture_rate, growth, base_exp_yield, base_egg_steps, effort_yield, egg_groups, learn_set, learn_moves, spawn_items)
    }
    constructor(){
    super()
    }
} 