export default class {
  constructor(config, trainer) {
    this.pid = 0;
    this.originalTrainer = null;
    this.nickname = null;
    this.species = 0;
    this.speciesName = null;
    this.exp = 0;
    this.isShiny = false;
    this.hp = {
      max: 0,
      current: 0,
    };
    this.moves = [];
    this.baseStats = {
      atk: 0,
      def: 0,
      spd: 0,
      spatk: 0,
      spdef: 0,
      hp: 0
    };
    this.ivs = {
      atk: 0,
      def: 0,
      spd: 0,
      spatk: 0,
      spdef: 0,
      hp: 0
    };
    this.evs = {
      atk: 0,
      def: 0,
      spd: 0,
      spatk: 0,
      spdef: 0,
      hp: 0
    };

    if (config) {
      Object.assign(this, config);
    }
    this.trainer = trainer;
  }

  attack(target, damage) {
    console.log('BattlePokemon: '+this.nickname+' attack!');
    target.takeDamage(damage);
  }

  takeDamage(damage) {
    this.hp.current -= damage;
  }

  getAttacks() {
    return this.moves.map(move => {
      return {
        name: move.name,
        damage: move.damage,
        pp: move.pp
      }
    });
  }

  debug() {
    console.log('BATTLEPOKEMON');
    console.log(this);
  }
}
