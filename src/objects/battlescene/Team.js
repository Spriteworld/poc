export default class {
  constructor(team) {
    this.active = 0;
    this.pokemon = team || [];
  }

  getFirstAlive() {
    let idx = this.pokemon.findIndex(mon => {
      return mon.currentHp > 0;
    });

    return this.pokemon[idx];
  }

  hasLivingPokemon() {
    return this.pokemon.some(mon => {
      return mon.currentHp > 0;
    });
  }

  debug() {
    console.log('BATTLETEAM');
    console.log(this);
  }
}
