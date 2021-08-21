import {Character} from '@Objects';

export default class extends Character {
  constructor(config) {
    super(config);
    this.config.cursors = this.config.scene.input.keyboard.createCursorKeys();

    this.config.scene.gridEngine.create(this.config.map, {
      characters: [this.characterDef(this.config)],
    });
  }

  update() {
    this.handleMovement();

    this.handleInteractables();
  }

  handleInteractables() {
    const interactions = this.config.scene.registry.get('interactions');

    // get the direction player is facing
    const position = this.getPosInFacingDirection();

    // check if the player is facing an interaction
    const hasInteraction = interactions.some(function(interaction) {
      return position.x == interaction.x && position.y == interaction.y;
    }) || false;

    const activator = this.config.scene.input.keyboard.addKey('Z');
    if (hasInteraction && activator.isDown) {
      // get said interaction
      const interaction = this.config.map.filterObjects('interactions', (obj) => position.x == obj.x && position.y == obj.y)[0];

      // alert the type
      switch (interaction.type) {
        case 'sign':
          alert(interaction.properties[0].value);
        break;
        default:
          alert(interaction.type);
      }
    }
  }

}
