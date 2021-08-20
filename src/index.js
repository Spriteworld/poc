import {config} from '@Data'
import {Game} from '@Objects'
import registerTiledJSONExternalLoader from 'phaser-tiled-json-external-loader';

registerTiledJSONExternalLoader(Phaser);

window.spriteworld = new Game(config);
