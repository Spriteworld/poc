import Phaser from 'phaser';
import {Player, NPC} from '@Objects';

export default class extends Phaser.Scene {
  constructor(config) {
    super({ key: config.mapName });
    this.config = config || {};
    this.config.inside = config.inside || false;
    this.config.x = config.x || 0;
    this.config.y = config.y || 0;
    this.config.map = config.map || {};
    this.config.mapName = config.mapName || '';
    this.config.tilemap = {};
    this.characters = [];
    // console.log(['Loading Scene', config.mapName]);

    // this.events.on('ready', () => {
    //   this.createCharacters();
    // });
  }

  preloadMap () {
    this.load.tilemapTiledJSONExternal(this.config.mapName, this.config.map);
  }

  loadMap () {
    var tilemap = this.make.tilemap({key: this.config.mapName});
    // this.registry.set('scene', this.name);

    var mapInside = tilemap.addTilesetImage('gen3_inside', 'gen3_inside');
    var mapOutside = tilemap.addTilesetImage('gen3_outside', 'gen3_outside');

    tilemap.layers.forEach((layer) => {
      tilemap
        .createLayer(layer.name, this.config.inside ? mapInside : mapOutside)
        .setName(layer.name);
    });

    this.objects = tilemap.getObjectLayer('interactions');
    if (this.objects !== null) {
      this.initSigns(tilemap);
      this.initNpcs(tilemap);
    }

    this.animatedTiles.init(tilemap);
    this.config.tilemap = tilemap;
  }

  initSigns(map) {
    const signs = map.filterObjects('interactions', (obj) => obj.type === 'sign');
    if (signs.length === 0) {
      return;
    }

    signs.map((sign) => {
      this.interactTile(map, sign, 0x00afe4);
    });
  }


  initNpcs(map) {
    const npcs = map.filterObjects('interactions', (obj) => obj.type === 'npc');
    if (npcs.length === 0) {
      return;
    }

    this.npcs = this.add.group();
    this.npcs.runChildUpdate = true;
    npcs.map((npc) => {
      console.log(npc);
      let npcObj = new NPC({
        id: npc.name,
        texture: this.getPropertyValue(npc.properties, 'texture'),
        x: npc.x / 32,
        y: npc.y / 32,
        scene: this,
        spin: this.getPropertyValue(npc.properties, 'spin'),
        spinRate: this.getPropertyValue(npc.properties, 'spinRate'),
        facingDirection: this.getPropertyValue(npc.properties, 'facingDirection', 'down'),
      //   move: 'random'
      });
      this.npcs.add(npcObj);
      this.interactTile(map, npc, 0x00afe4);
    });
  }

  interactTile(map, obj, color) {
    obj.x /= 32;
    obj.y /= 32;

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

  addCharacter(character) {
    this.characters.push(character);
  }

  createCharacters() {
    console.log(this.characters);
    this.gridEngine.create(this.config.tilemap, {
      characters: this.characters
    });
  }

  getPropertyValue(props, id, defValue) {
    let property = props.find(p => p.name === id);
    return typeof property === 'undefined' ? defValue : property.value;
  }

  debugRegistry() {
    console.log(this.registry.getAll());
  }


}
