import { Menu } from '@Objects';

export default class extends Menu {
  constructor(scene, x, y) {
    super(scene, x, y);

    // scene.plugins.get('rexAnchor').add(this, {
    //   right: '100%-100',
    //   top: 'top+10'
    // });

    this.addMenuItem('Attack');
    // this.addMenuItem('Bag');
    // this.addMenuItem('Pokemon');
    // this.addMenuItem('Run');
  }

  confirm() {
    // console.log('BattleMenu Confirm: ' + this.config.menuItemIndex);
    this.scene.events.emit('SelectMenu', this.config.menuItemIndex);
  }
}

