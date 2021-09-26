import Phaser from 'phaser';
import { BattlePokemon, BattleTrainer, BattleTeam } from '@Objects';
import { rnd } from '@Utilities';

export default class extends Phaser.Scene {
  constructor(config) {
    super({ key: 'BattleScene' });
    this.config = config || {};
    this.config.player = {};
    this.config.enemy = {};

    this.setState();
  }

  setState() {
    this.config.player = {};
    this.config.enemy = {};

    this.index = 0;
    this.activeMon = {
      player: null,
      enemy: null
    };
    this.playerTurn = 'player';
  }

  init(data) {
    this.config = { ...this.config, ...data };

    // trainers need setting up as BattleTrainer
    this.config.player = new BattleTrainer(this.config.player);
    this.config.enemy = new BattleTrainer(this.config.enemy);
    console.assert(this.config.player instanceof BattleTrainer, 'Player isnt a BattleTainer');

    // force the teams into BattlePokemon objs
    this.config.player.team = this.config.player.team.map(
      mon => new BattlePokemon(mon, this.config.player.name)
    );
    this.config.enemy.team = this.config.enemy.team.map(
      mon => new BattlePokemon(mon, this.config.enemy.name)
    );

    // set the teams
    this.config.player.team = new BattleTeam(this.config.player.team);
    this.config.enemy.team = new BattleTeam(this.config.enemy.team);
    console.assert(this.config.player.team instanceof BattleTeam, 'Players Team isnt a BattleTeam');

    // set the active mons to each trainers first mon
    this.activeMon = {
      player: this.config.player.team.getFirstAlive(),
      enemy: this.config.enemy.team.getFirstAlive()
    };
  }

  create () {
    console.group('BattleScene');
    console.log(this.config);
    console.groupEnd();

    this.scene.run('BattleUI');
  }

  endBattle() {
    console.info('BattleScene::exitBattle');
    this.events.emit('BattleEnd', this.config.player.team.hasLivingPokemon());
    // this.scene.sleep('BattleUI');
    // this.scene.switch('');
  }

  checkEndBattle() {
    // do we have living pokemon on the players team?
    if (!this.config.player.team.hasLivingPokemon()) {
      return true;
    }
    // or on the enemies team?
    if (!this.config.enemy.team.hasLivingPokemon()) {
      return true;
    }

    return false;
  }

  nextTurn() {
    console.group('BattleScene::nextTurn');
    console.log('checkEndBattle: '+(this.checkEndBattle() ? 'true' : 'false'));
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }

    this.index++;

    // which one
    this.playerTurn = this.index % 2 === 0 ? 'enemy' : 'player';
    console.log('it is '+this.playerTurn+'\'s turn!');
    // if (!this.activeMon[this.playerTurn]) {
    //   return;
    // }
    // console.log(this.activeMon);
    console.log('active trainer: '+this.activeMon[this.playerTurn].trainer);
    // if the mon belongs to the player
    if (this.playerTurn === 'player') {
      console.log('players '+this.activeMon[this.playerTurn].nickname+'\s turn');
      this.events.emit('SelectMenu', 4);
    } else {
      console.log('enemys '+this.activeMon[this.playerTurn].nickname+'\s turn');
      // call the enemy's attack function
      let dmg = rnd(1, 6);
      this.activeMon['enemy'].attack(this.activeMon['player'], dmg);
      console.log(this.activeMon['enemy'].nickname + ' attacks ' + this.activeMon['player'].nickname +' for '+dmg+' damage');
      // add timer for the next turn, so will have smooth gameplay
      this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
    }
    console.groupEnd();
  }

  receivePlayerSelection(action) {
    if (action == 'attack') {
      console.group('BattleScene::attack');
      let dmg = rnd(1, 6);
      this.activeMon['player'].attack(this.activeMon['enemy'], dmg);
      console.log(this.activeMon['player'].nickname + ' attacks ' + this.activeMon['enemy'].nickname +' for '+dmg+' damage');
      console.groupEnd();
    }
    this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
  }
}
