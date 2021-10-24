import Phaser from 'phaser'
import GridEngine from 'grid-engine';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import AnchorPlugin from 'phaser3-rex-plugins/plugins/anchor-plugin.js';
import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles';
import * as Scenes from '@Scenes';

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
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {debug: true}
  },
  plugins: {
    global: [
      { key: 'rexAnchor', plugin: AnchorPlugin, start: true },
    ],
    scene: [
      { key: 'gridEngine', plugin: GridEngine, mapping: 'gridEngine' },
      { key: 'rexUI', plugin: UIPlugin, mapping: 'rexUI' },
      { key: 'animatedTiles', plugin: AnimatedTiles, mapping: 'animatedTiles' }
    ],
  },
  scene: Object.values(Scenes)
};

export default config;
