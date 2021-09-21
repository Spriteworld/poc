import { Menu } from '@Objects';

export default class extends Menu {
  constructor(scene, x, y) {
    super(scene, x, y);

    scene.plugins.get('rexAnchor').add(this, {
      right: '100%-100',
      top: 'top+10'
    });

    this.addMenuItem('Pokedex');
    this.addMenuItem('Pokemon');
    this.addMenuItem('Bag');
    this.addMenuItem('Trainer');
    this.addMenuItem('Save');
    this.addMenuItem('Options');
    this.addMenuItem('Debug');
    this.addMenuItem('Close');

    scene.input.keyboard.on('keydown-ENTER', function(e) {
      this.setVisible(!this.visible);
    }.bind(this));
  }
}

