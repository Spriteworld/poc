import {NPC} from '@Objects';

export default class extends NPC {
  constructor(config) {
    config.texture = 'police_man';
    super(config);
  }
}
