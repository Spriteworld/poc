import {Character, NPCScripts, Direction} from '@Objects';
import {textBox} from '@Utilities';

export default class extends Character {
  constructor(config) {
    config.type = 'player';
    super(config);
    this.config.cursors = this.config.scene.input.keyboard.createCursorKeys();
    this.textbox = this.config.scene.scene.get('OverworldUI').textbox;

    this.setOrigin(0.5, 0.5);
  }

  update() {
    this.handleAutoMoveTiles();
    this.handleMovement();
    this.handleRun();

    this.handleInteractables();
    this.canSeeCharacter();
  }

  disableMovement() {
    console.log('player::disableMovement');
    this.config.scene.registry.set('player_input', false);
  }

  enableMovement() {
    console.log('player::enableMovement');
    this.config.scene.registry.set('player_input', true);
  }

  handleInteractables() {
    // ignore the showing textbox code if were still typing shiz
    // console.log(this.textbox);
    if (this.scene.registry.get('textbox-active') === true) {
      return;
    }

    const interactions = this.config.scene.registry.get('interactions');
    if (typeof interactions === 'undefined') { return; }

    // get the direction player is facing
    const position = this.getPosInFacingDirection();

    // check if the player is facing an interaction
    const interaction = interactions.find(function(interaction) {
      return position.x == interaction.x && position.y == interaction.y;
    })?.obj || false;

    const activator = this.config.scene.input.keyboard.addKey('Z');
    if (interaction !== false && activator.isDown) {
      console.log('interaction!', interaction);

      let look = '';
      switch(this.getFacingDirection().toUpperCase()) {
        case Direction.LEFT:
          look = Direction.RIGHT;
        break;
        case Direction.RIGHT:
          look = Direction.LEFT;
        break;
        case Direction.UP:
          look = Direction.DOWN;
        break;
        case Direction.DOWN:
          look = Direction.UP;
        break;
      }

      // alert the type
      var text = null;
      switch (interaction.type) {
        case 'sign':
          text = interaction.properties[0].value;
        break;
        case 'npc':
          text = NPCScripts[interaction.id] || interaction.id;
          var char = Object.values(this.config.scene.characters)
            .find(obj => obj.config.id === interaction.id)
          ;
          char?.look(look.toLowerCase());
          char?.stopSpin(true);
        break;
        case 'pkmn':
          text = interaction.id;
          var char = Object.values(this.config.scene.mon)
            .find(obj => obj.config.id === interaction.id)
          ;
          char?.look(look.toLowerCase());
        break;
        default:
          console.log('unknown interaction type', interaction);
      }

      if (text === null) { return; }
      this.scene.registry.set('textbox-active', true);
      this.textbox.start(text, 150);
    }
  }

}
