import {NPC} from '@Objects';

export default class extends NPC {
  constructor(config) {
    config.texture = 'poke_kid';
    super(config);
  }
}
