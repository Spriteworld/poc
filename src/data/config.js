import Phaser from 'phaser'
import GridEngine from 'grid-engine';
import SceneWatcherPlugin from 'phaser-plugin-scene-watcher';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles';

const config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  pixelArt: true,
  disableContextMenu: true,
  fps: {
    target: 30,
    forceSetTimeOut: true
  },
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {debug: true}
  },
  plugins: {
    global: [
      //{ key: 'SceneWatcher', plugin: SceneWatcherPlugin, start: true }
    ],
    scene: [
      { key: 'gridEngine', plugin: GridEngine, mapping: 'gridEngine' },
      { key: 'rexUI', plugin: UIPlugin, mapping: 'rexUI' },
      { key: 'animatedTiles', plugin: AnimatedTiles, mapping: 'animatedTiles' }
    ],
  }
};

export default config;
