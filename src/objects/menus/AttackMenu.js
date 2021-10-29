import { Menu } from '@Objects';

export default class extends Menu {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.addMenuItem('Attacks!');
  }

  confirm() {
    // console.log('AttackMenu Confirm: ' + this.config.menuItemIndex);
    this.scene.events.emit('SelectAttack', this.config.menuItemIndex);
  }
}

