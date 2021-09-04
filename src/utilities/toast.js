
var createToast = function (scene, x, y, config) {
  var wrapWidth = scene.getValue(config, 'wrapWidth', 0);
  var fixedWidth = scene.getValue(config, 'fixedWidth', 0);
  var fixedHeight = scene.getValue(config, 'fixedHeight', 0);
  var toast = scene.rexUI.add.toast({
    x: x,
    y: y,
    background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x000000)
      .setStrokeStyle(2, 0xffffff),
    text: scene.add.text(0, 0, '', {
        fontSize: '20px',
        color: '#fff',
    }),
    space: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
      icon: 10,
      text: 10,
    },
    duration: {
      in: 450,
      hold: 1500,
      out: 450,
    },
  }) .setOrigin(0);

  scene.plugins.get('rexAnchor').add(toast, {
    left: 'left+10',
    top: 'top+10'
  });

  return toast;
}
export { createToast };
