export class Ability{
    constructor(id, name, hidden){
    this.id = id;
    this.name = name;
    this.hidden = hidden;
    }

    get getAbilityId(){
        return this.id
    }
    get getAbilityName(){
        return this.name;
    }
    get isAbilityHidden(){
        return this.hidden;
    }
}

export class BaseStats{
    constructor(attack, defense, special_attack, special_defense, speed, hp, happiness){
        this.attack = attack;
        this.defense = defense;
        this.special_attack = special_attack;
        this.special_defense = special_defense;
        this.speed = speed;
        this.hp = hp;
        this.happiness = happiness;
    }

    get getBaseAttack(){
        return this.attack;
    }
    get getBaseDefense(){
        return this.defense;
    }
    get getBaseSpecialAttack(){
        return this.special_attack;
    }
    get getBaseSpecialDefense(){
        return this.special_defense;
    }
    get getBaseSpeed(){
        return this.speed;
    }
    get getBaseHp(){
        return this.hp;
    }
    get getBaseHappiness(){
        return this.happiness;
    }
}

export class EvolutionCriteria{
    constructor(newPokemonId, evolutionMethod, evolutionTrigger){
        this.newPokemonId = newPokemonId;
        this.evolutionMethod = evolutionMethod;
        this.evolutionTrigger = evolutionTrigger;
    }
}

export class Gender{
    constructor(type, ratio){
        this.type = type;
        this.ratio = ratio
    }

    get getGenderType(){
        return this.type;
    }
    get getGenderRatio(){
        return this.ratio
    }
}