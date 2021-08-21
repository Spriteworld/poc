import Phaser from 'phaser';

export default class extends Phaser.Scene {
  constructor(config) {
    super({ key: config.mapName });
    this.config = config || {};
    this.config.inside = config.inside || false;
    this.config.x = config.x || 0;
    this.config.y = config.y || 0;
    this.config.tilemap = {};
    this.config.map = config.map || {};
    this.config.mapName = config.mapName || '';
  }

  preloadMap () {
    this.load.tilemapTiledJSONExternal(this.config.mapName, this.config.map);
  }

  loadMap () {
    this.config.tilemap = this.make.tilemap({key: this.config.mapName});
    this.registry.set('scene', this.name);

    var mapInside = this.config.tilemap.addTilesetImage('gen3_inside', 'gen3_inside');
    var mapOutside = this.config.tilemap.addTilesetImage('gen3_outside', 'gen3_outside');

    this.config.tilemap.layers.forEach((layer) => {
      this.config.tilemap.createLayer(layer.name, this.config.inside ? mapInside : mapOutside).setName(layer.name);
    });

    this.objects = this.config.tilemap.getObjectLayer('interactions');
    this.initSigns(this.config.tilemap);

    this.animatedTiles.init(this.config.tilemap);
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
