import Phaser from 'phaser';
import { ActivePokemonMenu, BattleMenu, PokemonTeamMenu, AttackMenu, BagMenu } from '@Objects';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'BattleUI' });

    this.currentMenu = false;
  }

  create () {
    console.group('Battle UI');
    this.battleScene = this.scene.get('BattleScene');
    this.menus = this.add.container();

    this.activePokemonMenu = new ActivePokemonMenu(this.battleScene, 10, 10);
    this.menus.add(this.activePokemonMenu);

    this.battleMenu = new BattleMenu(this.battleScene, 10, 100);
    this.menus.add(this.battleMenu);

    this.attackMenu = new AttackMenu(this.battleScene, 10, 200);
    this.menus.add(this.attackMenu);

    // this.pokemonTeamMenu = new PokemonTeamMenu(this.battleScene, 10, 300);
    // this.menus.add(this.pokemonTeamMenu);

    // this.bagMenu = new BagMenu(this.battleScene, 410, 100);
    // this.menus.add(this.bagMenu);

    this.input.keyboard.on('keydown', this.onKeyInput, this);
    this.battleScene.events.on('SelectMenu', this.onSelectMenu, this);
    this.battleScene.events.on('SelectAttack', this.onSelectAttack, this);
    this.battleScene.events.on('BattleEnd', this.onBattleEnd, this);

    this.battleScene.nextTurn();
    console.groupEnd();
  }

  update() {
    this.remapActivePokemon();
  }

  onKeyInput(event) {
    if (!this.currentMenu || !this.currentMenu.config.selected) {
      return;
    }

    if (event.code === 'ArrowUp') {
      this.currentMenu.moveSelectionUp();
    } else if (event.code === 'ArrowDown') {
      this.currentMenu.moveSelectionDown();
    } else if (event.code === 'ArrowRight') {
    } else if (event.code === 'ArrowLeft') {
    } else if (event.code === 'Enter') {
      this.currentMenu.confirm();
    }
  }

  onBattleEnd(result) {
    if (result === true) {
      alert('You Win!');
    } else {
      alert('You Lose!');
    }

    this.battleMenu.remap([]);
    this.attackMenu.remap([]);
    this.activePokemonMenu.deselect();
  }

  onSelectMenu(index) {
    // console.log('BattleUI::onSelectMenu: '+index);
    if (this.currentMenu) {
      this.currentMenu.deselect();
    }
    switch(index) {
      case 0:
        this.currentMenu = this.attackMenu;
        this.remapAttacks();
      break;
      // case 1: this.currentMenu = this.bagMenu; break;
      // case 2: this.currentMenu = this.pokemonTeamMenu; break;
      case 3: /* handle run code */ break;
      case 4: this.currentMenu = this.battleMenu; break;
    }
    this.currentMenu.select(0);
  }

  onSelectAttack(index) {
    // console.log('BattleUI::onSelectAttack: '+index);
    this.resetAttacks();
    // this.bagMenu.deselect();
    // this.pokemonTeamMenu.deselect();
    this.currentMenu = false;

    this.battleScene.receivePlayerSelection('attack');
  }

  remapActivePokemon() {
    let activePokemon = this.battleScene.activeMon;
    let playerTurn = this.battleScene.playerTurn;

    this.activePokemonMenu.remap(
      [activePokemon['player'], activePokemon['enemy']].map(trainer => {
        let trainerName = trainer.originalTrainer;
        let nickname = trainer.nickname;
        let hpCurr = trainer.hp.current;
        let hpMax = trainer.hp.max;
        return `${trainerName} - ${nickname} (${hpCurr} / ${hpMax})`;
      })
    );

    this.activePokemonMenu.select(playerTurn === 'player' ? 0 : 1);
  }

  resetAttacks() {
    this.attackMenu.remap(['Attacks!']);
    this.attackMenu.deselect();
  }

  remapAttacks() {
    let playerTurn = this.battleScene.playerTurn;
    let attacks = this.battleScene.activeMon[playerTurn].getAttacks();

    this.attackMenu.remap(attacks.map(move => {
      return `${move.name} (${move.pp.current}pp)`;
    }));
  }
}
