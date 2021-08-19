import Phaser from 'phaser'
import GridEngine from 'grid-engine';
import SceneWatcherPlugin from 'phaser-plugin-scene-watcher';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

const config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  pixelArt: true,
  disableContextMenu: true,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: { default: false },
  plugins: {
    global: [
      //{ key: 'SceneWatcher', plugin: SceneWatcherPlugin, start: true }
    ],
    scene: [
      { key: 'gridEngine', plugin: GridEngine, mapping: 'gridEngine' },
      { key: 'rexUI', plugin: UIPlugin, mapping: 'rexUI' }
    ],
  }
};

export default config;
