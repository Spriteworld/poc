
var createTextBox = function (scene, x, y, config) {
    var wrapWidth = scene.getValue(config, 'wrapWidth', 0);
    var fixedWidth = scene.getValue(config, 'fixedWidth', 0);
    var fixedHeight = scene.getValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({
        x: x,
        y: y,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x000000)
              .setStrokeStyle(2, 0xffffff),
        icon: null,

        // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
        text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

        action: scene.add.image(0, 0, 'nextPage').setTint(0x7b5e57).setVisible(false),

        space: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
          icon: 10,
          text: 10,
        }
      })
      .setOrigin(0)
      .layout()
    ;

    scene.plugins.get('rexAnchor').add(textBox, {
      bottom: '100%-10%',
      centerX: 'center'
    });

    textBox
      .setInteractive()
      .on('complete', function () {
        this.scene.get(this.registry.get('scene'))
          .time
          .addEvent({
            delay: 500,
            callbackScope: this,
            callback: () => {
              this.registry.set('textbox-active', false);
            }
          })
        ;
      }, scene)
    ;

    scene.input.keyboard.on('keydown-Z', function () {
      if (this.isTyping) {
        console.log('textbox::insta finish');
        this.stop(true);
      } else if (!this.isLastPage) {
        console.log('textbox::next page');
        this.typeNextPage();
      }
    }.bind(textBox));

    return textBox;
}

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.add.text(0, 0, '', {
    fontSize: '20px',
    wordWrap: {
      width: wrapWidth
    },
    maxLines: 2
  })
  .setFixedSize(fixedWidth, fixedHeight);
}

var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth: fixedWidth,
    fixedHeight: fixedHeight,

    fontSize: '20px',
    wrap: {
      mode: 'word',
      width: wrapWidth
    },
    maxLines: 2
  })
}
export { createTextBox };
