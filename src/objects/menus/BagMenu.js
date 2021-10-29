import { Menu } from '@Objects';

export default class extends Menu {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.addMenuItem('Bag!');
  }

  confirm() {

  }
}

