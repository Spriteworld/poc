import Phaser from 'phaser';
import { MenuItem } from '@Objects';

export default class extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    this.config = {};
    this.config.scene = scene;
    this.config.menuItems = [];
    this.config.menuItemIndex = 0;
    this.config.x = x;
    this.config.y = y;

    scene.add.existing(this);
  }

  addMenuItem(item) {
    let menuItem = new MenuItem(this.config.scene, 0, this.config.menuItems.length*20, item);
    this.config.menuItems.push(menuItem);
    this.add(menuItem);
  }

  moveSelectionUp() {
    this.config.menuItems[this.config.menuItemIndex].deselect();
    this.config.menuItemIndex--;
    if (this.config.menuItemIndex < 0) {
      this.config.menuItemIndex = this.config.menuItems.length - 1;
    }
    this.config.menuItems[this.config.menuItemIndex].select();
  }

  moveSelectionDown() {
    this.config.menuItems[this.config.menuItemIndex].deselect();
    this.config.menuItemIndex++;
    if (this.config.menuItemIndex >= this.config.menuItems.length) {
      this.config.menuItemIndex = 0;
    }
    this.config.menuItems[this.config.menuItemIndex].select();
  }

  select(index) {
    if(!index) { index = 0; }
    this.config.menuItems[this.config.menuItemIndex].deselect();
    this.config.menuItemIndex = index;
    this.config.menuItems[this.config.menuItemIndex].select();
  }

  deselect() {
    this.config.menuItems[this.config.menuItemIndex].deselect();
    this.config.menuItemIndex = 0;
  }

  confirm() {
  }

  clear() {
    for(var i = 0; i < this.config.menuItems.length; i++) {
      this.config.menuItems[i].destroy();
    }
    this.config.menuItems.length = 0;
    this.config.menuItemIndex = 0;
  }

  // recreate the menu items
  remap(units) {
    this.clear();
    for(var i = 0; i < units.length; i++) {
      var unit = units[i];
      unit.setMenuItem(this.config.addMenuItem(unit.type));
    }
    this.config.menuItemIndex = 0;
  }

}
