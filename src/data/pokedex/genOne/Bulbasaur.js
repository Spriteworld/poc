import { BaseGenOnePokemon } from "./BaseGenOnePokemon";
import * as pokedex_models from "../pokedex_models";
import * as pokedex_definitions from "../pokedex_definitions";

export class Bulbasaur extends BaseGenOnePokemon{
    constructor(){
            super();
            this.setPokemonId(1);
            this.setPokemonSpecies("bulbasaur");
            this.setPokemonDex_desc("None");
            this.setPokemonBase_stat(new pokedex_models.BaseStats(49,49,65,65,45,45,70));
            this.setPokemonTypes({type1:pokedex_definitions.POKEMON_TYPE.GRASS, type2:pokedex_definitions.POKEMON_TYPE.POISON});
            this.setPokemonEvolution(new pokedex_models.EvolutionCriteria(2, pokedex_definitions.EVOLUTION_TYPE.LEVEL, 16));
            this.setPokemonAbilities({ability1:new pokedex_models.Ability(0,"Overgrow",false), ability2:new pokedex_models.Ability(0,"Chlorophyll",true)});
            this.setPokemonColour(pokedex_definitions.COLOR.GREEN);
            this.setPokemonForm(null);
            this.setPokemonWeight(7);
            this.setPokemonHeight(69);
            this.setPokemonGenders({gender1:new pokedex_models.Gender("male","87.5"), gender2:new pokedex_models.Gender("female", "12.5") });
            this.setPokemonCaptureRate(45);
            this.setPokemonGrowth(pokedex_definitions.GROWTH.MEDIUM_SLOW);
            this.setPokemonBase_exp_yield(64);
            this.setPokemonBase_egg_steps(5120);
            this.setPokemonEffort_yield(null)
            this.setPokemonEgg_groups(null)
            this.setPokemonLearn_set(null)
            this.setPokemonLearn_moves(null)
            this.setPokemonSpawn_items(null)
    }
}