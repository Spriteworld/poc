import Phaser from 'phaser';

export default class extends Phaser.Scene {
  constructor(config) {
    super({ key: config.mapName });
    this.config = config || {};
    this.config.inside = config.inside || false;
    this.config.x = config.x || 0;
    this.config.y = config.y || 0;
    console.log(['Loaded Scene', this.config]);
  }

  preload () {
    console.log(['loading map', this.config.mapName]);
    this.load.tilemapTiledJSONExternal(this.config.mapName, this.config.map);
  }

  create () {
    console.log(['creating map', this.map]);
    const map = this.make.tilemap({key: this.config.mapName});
    this.registry.set('scene', this.constructor.name);

    var mapInside = map.addTilesetImage('gen3_inside', 'gen3_inside');
    var mapOutside = map.addTilesetImage('gen3_outside', 'gen3_outside');

    map.layers.forEach((layer) => {
      map.createLayer(layer.name, this.config.inside ? mapInside : mapOutside).setName(layer.name);
    });

    this.objects = map.getObjectLayer('interactions');
    this.initSigns(map);

    this.animatedTiles.init(map);
  }

  initSigns(map) {
    const signs = map.filterObjects('interactions', (obj) => obj.type === 'sign');
    if (signs.length === 0) {
      return;
    }

    signs.map((sign) => {
      sign.x /= 32;
      sign.y /= 32;
      this.interactTile(map, sign, 0x00afe4);
    });
  }

  interactTile(map, obj, color) {
    this.registry.get('interactions').push({x: obj.x, y: obj.y, obj: obj});
    // this.tintTile(map, obj.x,    obj.y,     color); // actual
    // this.tintTile(map, obj.x -1, obj.y,     color); // left
    // this.tintTile(map, obj.x +1, obj.y,     color); // right
    // this.tintTile(map, obj.x,    obj.y -1,  color); // up
    // this.tintTile(map, obj.x,    obj.y +1,  color); // down
  }

  tintTile(tilemap, col, row, color) {
    for (let i = 0; i < tilemap.layers.length; i++) {
      tilemap.layers[i].tilemapLayer.layer.data[row][col].tint = color;
    }
  }

  debugRegistry() {
    console.log(this.registry.getAll());
  }


}
