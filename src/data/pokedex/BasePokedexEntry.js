
export class BasePokedexEntry{    
    constructor(id, species, dex_desc, base_stats, types, evolution, abilities, colour, form, weight, height, genders, capture_rate, growth, base_exp_yield, base_egg_steps, effort_yield, egg_groups, learn_set, learn_moves, spawn_items){
    this.id = id;
    this.species = species;
    this.dex_desc = dex_desc;
    this.base_stats = base_stats;
    this.types = types;
    this.evolution = evolution;
    this.abilities = abilities;
    this.colour = colour;
    this.form = form;
    this.weight = weight;
    this.height = height;
    this.genders = genders;
    this.capture_rate = capture_rate;
    this.growth = growth;
    this.base_exp_yield = base_exp_yield;
    this.base_egg_steps = base_egg_steps;
    this.effort_yield = effort_yield; 
    this.egg_groups = egg_groups;
    this.learn_set = learn_set; 
    this.learn_moves = learn_moves; 
    this.spawn_items = spawn_items;
    }
    constructor(){}

    get getPokemonId(){
        return this.id;
    }
    get getPokemonSpecies(){
        return this.species;
    }
    get getPokemonDex_desc(){
        return this.dex_desc;
    }
    get getPokemonBase_stat(){
        return this.base_stats;
    }
    get getPokemonTypes(){
        return this.types;
    }
    get getPokemonEvolution(){
        return this.evolution;
    }
    get getPokeAbilities(){
        return this.abilities;
    }
    get getPokemonColour(){
        return this.colour;
    }
    get getPokemonForm(){
        return this.form;
    }
    get getPokemonWeight(){
        return this.weight;
    }
    get getPokemonHeight(){
        return this.height;
    }
    get getPokemonGenders(){
        return this.genders;
    }
    get getPokemonCaptureRate(){
        return this.capture_rate;
    }
    get getPokemonGrowth(){
        return this.growth;
    }
    get getPokemonBase_exp_yield(){
        return this.base_exp_yield;
    }
    get getPokemonBase_egg_steps(){
        return this.base_egg_steps;
    }
    get getPokemonEffort_yield(){
        return this.effort_yield;
    }
    get getPokemonEgg_groups(){
        return this.egg_groups;
    }
    get getPokemonLearn_set(){
        return this.learn_set;
    }
    get getPokemonLearn_moves(){
        return this.learn_moves;
    }
    get getPokemonSpawn_items(){
        return this.spawn_items;
    }

    set setPokemonId(id){
        this.id = id;
    }
    set setPokemonSpecies(species){
        this.species = species;
    }
    set setPokemonDex_desc(dex_desc){
         this.dex_desc = dex_desc;
    }
    set setPokemonBase_stat(base_stats){
        this.base_stats = base_stats;
    }
    set setPokemonTypes(types){
        this.types = types;
    }
    set setPokemonEvolution( evolution){
        this.evolution = evolution;
    }
    set setPokemonAbilities(abilities){
        this.abilities = abilities;
    }
    set setPokemonColour(colour){
        this.colour = colour;
    }
    set setPokemonForm(form){
        this.form = null;
    }
    set setPokemonWeight(weight){
        this.weight = weight;
    }
    set setPokemonHeight(height){
        this.height = height;
    }
    set setPokemonGenders(genders){
        this.genders = genders;
    }
    set setPokemonCaptureRate(capture_rate){
        this.capture_rate = capture_rate;
    }
    set setPokemonGrowth(growth){
        this.growth = growth;
    }
    set setPokemonBase_exp_yield(base_exp_yield){
        this.base_exp_yield = base_exp_yield;
    }
    set setPokemonBase_egg_steps(base_egg_steps){
        this.base_egg_steps = base_egg_steps;
    }
    set setPokemonEffort_yield(effort_yield){
        this.effort_yield = effort_yield;
    }
    set setPokemonEgg_groups(egg_groups){
        this.egg_groups = egg_groups;
    }
    set setPokemonLearn_set(learn_set){
        this.learn_set = learn_set;
    }
    set setPokemonLearn_moves(learn_moves){
        this.learn_moves = learn_moves;
    }
    set setPokemonSpawn_items(spawn_items){
        this.spawn_items = spawn_items;
    }
}
