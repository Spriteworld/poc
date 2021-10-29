import {NPC} from '@Objects';

export default class extends NPC {
  constructor(config) {
    config.texture = 'ace_trainer';
    super(config);
  }
}
