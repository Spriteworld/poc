import Phaser from 'phaser';
import {textBox, toast} from '@Utilities';
import {PauseMenu} from '@Objects';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'UI' });

  }

  preload () {
  }

  create () {
    this.activeScene = this.registry.get('scene');

    // init some events
    let events = {
      'interactions': [],
      'warps': [],
      'interaction-active': false
    };
    Object.keys(events).forEach(eventKey => {
      if (this.registry.has(eventKey) === false) {
        this.registry.set(eventKey, events[eventKey]);
      }
    })

    // toast
    this.toast = toast(this, 10, 10, {});

    // textbox
    this.textbox = textBox(this, 100, 400, {
      wrapWidth: 500,
      fixedWidth: 500,
      fixedHeight: 65
    });
    this.textbox.setVisible(false);

    // set pause menu
    this.pauseMenu = new PauseMenu(this, 0, 0);
    this.pauseMenu.setVisible(false);

    this.handleEvents();
  }

  getValue(obj, value, defValue) {
    return Phaser.Utils.Objects.GetValue(obj, value, defValue);
  }

  handleEvents() {
    // this should trigger on map change
    this.registry.events.on('changedata-triggerToast', function(parent, value) {
      this.showMessage(value);
    }.bind(this.toast));

    //
    // do something if interaction == false
    this.registry.events.on('changedata-interaction-active', function(parent, value) {
      let activeScene = this.scene.get(this.registry.get('scene'));
      if (value === true) {
        this.textbox.setVisible(true);
        activeScene.player.disableMovement();
      } else {
        this.textbox.setVisible(false);
        activeScene.player.enableMovement();
      }
    }.bind(this));
  }
}
