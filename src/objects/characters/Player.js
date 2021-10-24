import {Character, NPCScripts} from '@Objects';
import {textBox} from '@Utilities';

export default class extends Character {
  constructor(config) {
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
    // this.canSeePlayer();
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
    if (this.scene.registry.get('interaction-active') === true) {
      return;
    }

    const interactions = this.config.scene.registry.get('interactions');
    if (typeof interactions === 'undefined') { return; }

    // get the direction player is facing
    const position = this.getPosInFacingDirection();

    // check if the player is facing an interaction
    const hasInteraction = interactions.some(function(interaction) {
      return position.x == interaction.x && position.y == interaction.y;
    }) || false;

    const activator = this.config.scene.input.keyboard.addKey('Z');
    if (hasInteraction && activator.isDown) {
      // get said interaction
      const interaction = this.config.scene.config.
        tilemap.filterObjects('interactions', (obj) => position.x == obj.x && position.y == obj.y)[0];

      console.log('interaction!', interaction);
      // alert the type
      var text = null;
      switch (interaction.type) {
        case 'sign':
          text = interaction.properties[0].value;
        break;
        case 'npc':
          text = NPCScripts[interaction.name] || interaction.name;
        break;
        case 'pkmn':
          text = interaction.name;
        break;
        default:
          console.log('unknown interaction type', interaction);
      }

      if (text === null) { return; }
      this.scene.registry.set('interaction-active', true);
      this.textbox.start(text, 150);
    }
  }

}
