import {config} from '@Data'
import {Game} from '@Objects'
import {gen3inside, gen3outside} from '@Tileset';
import {PalletMap, TestMap, TestScene} from '@Maps';

new Game(config);
// class test extends Phaser.Scene {
//   constructor () {
//     super();
//   }

//   preload () {
//     // this.load.image('gen3_inside', gen3inside);
//     this.load.image('gen3_outside', gen3outside);
//     this.load.tilemapTiledJSON('test', PalletMap);
//     this.load.spritesheet('red', '../tileset/red.png', {
//       frameWidth: 32,
//       frameHeight: 40,
//     });
//   }

//   create () {
//     const map = this.make.tilemap({key: 'test'});
//     var mapTileset = map.addTilesetImage('gen3_outside', 'gen3_outside');

//     const floorLayer = map.createLayer('floor', mapTileset);
//     const groundLayer = map.createLayer('ground', mapTileset);
//     const topLayer = map.createLayer('top', mapTileset);
//     const animLayer = map.createLayer('animation', mapTileset);

//     var playerSprite = this.add.sprite(0, 0, 'red');
//     this.cameras.main.startFollow(playerSprite, true);
//     playerSprite.depth = 1;

//     const gridEngineConfig = {
//       characters: [{
//         id: 'player',
//         sprite: playerSprite,
//         walkingAnimationMapping: {
//           up: {
//             leftFoot: 15,
//             standing: 12,
//             rightFoot: 13,
//           },
//           down: {
//             leftFoot: 1,
//             standing: 0,
//             rightFoot: 3,
//           },
//           left: {
//             leftFoot: 5,
//             standing: 4,
//             rightFoot: 7,
//           },
//           right: {
//             leftFoot: 8,
//             standing: 9,
//             rightFoot: 10,
//           },
//         },
//         startPosition: { x: 6, y: 8},
//       }],
//     };
//     this.gridEngine.create(map, gridEngineConfig);

//     PhaserGUIAction(this);
//   }

//   update() {
//     const cursors = this.input.keyboard.createCursorKeys();
//     if (cursors.left.isDown) {
//       this.gridEngine.move('player', 'left');
//     } else if (cursors.right.isDown) {
//       this.gridEngine.move('player', 'right');
//     } else if (cursors.up.isDown) {
//       this.gridEngine.move('player', 'up');
//     } else if (cursors.down.isDown) {
//       this.gridEngine.move('player', 'down');
//     }
//   }

// }

// config.scene = new test;
// const game = new Phaser.Game(config);
