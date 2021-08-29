import Phaser from 'phaser';
import {Player, NPC, PkmnOverworld} from '@Objects';

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
    this.config.playerLocation = {};

    this.cameraFade = 150;
    // console.log(['Loading Scene', config.mapName]);
    // console.log(this);
  }

  init(data) {
    // console.log(['init data', data]);
    this.config = { ...this.config, ...data };
    this.player = {};
    this.playerMon = {};
    this.characters = [];
    this.warps = [];
  }

  preloadMap () {
    this.load.tilemapTiledJSONExternal(this.config.mapName, this.config.map);
  }

  loadMap () {
    this.cameras.main.fadeIn(this.cameraFade, 0, 0, 0)
    var tilemap = this.make.tilemap({key: this.config.mapName});
    this.config.tilemap = tilemap;
    this.registry.set('map', this.config.mapName);

    let tilesets = [
      tilemap.addTilesetImage('gen3_inside', 'gen3_inside'),
      tilemap.addTilesetImage('gen3_outside', 'gen3_outside'),
      tilemap.addTilesetImage('rse_inside', 'rse_inside')
    ];

    tilemap.layers.forEach((layer) => {
      tilemap
        .createLayer(layer.name, tilesets)
        .setName(layer.name);
    });

    this.objects = tilemap.getObjectLayer('interactions');
    if (this.objects !== null) {
      this.registry.set('interactions', []);
      this.registry.set('warps', []);
      this.initSigns();
      this.initNpcs();
      this.initWarps();
    }

    this.animatedTiles.init(tilemap);
  }

  initSigns() {
    let signs = this.config.tilemap.filterObjects('interactions', (obj) => obj.type === 'sign');
    if (signs.length === 0) {
      return;
    }

    signs.map((sign) => {
      this.interactTile(this.config.tilemap, sign, 0x00afe4);
    });
  }


  initNpcs() {
    let npcs = this.config.tilemap.filterObjects('interactions', (obj) => obj.type === 'npc');
    if (npcs.length === 0) { return; }

    this.npcs = this.add.group();
    this.npcs.runChildUpdate = true;
    let color = this.random_rgba();
    npcs.map((npc) => {
      let npcObj = new NPC({
        id: npc.name,
        texture: this.getPropertyValue(npc.properties, 'texture'),
        x: npc.x / 32,
        y: npc.y / 32,
        scene: this,
        spin: this.getPropertyValue(npc.properties, 'spin'),
        spinRate: this.getPropertyValue(npc.properties, 'spinRate'),
        facingDirection: this.getPropertyValue(npc.properties, 'facingDirection', 'down'),
        move: this.getPropertyValue(npc.properties, 'move'),
        moveRate: this.getPropertyValue(npc.properties, 'moveRate'),
        moveRadius: this.getPropertyValue(npc.properties, 'moveRadius'),
      });
      this.npcs.add(npcObj);
      this.interactTile(this.config.tilemap, npc, color);
    });
  }

  initWarps() {
    let warps = this.config.tilemap.filterObjects('interactions', (obj) => obj.type === 'warp');
    if (warps.length === 0) { return; }

    let color = this.random_rgba();
    warps.map((obj) => {
      obj.x /= 32;
      obj.y /= 32;

      this.registry.get('warps').push({
        name: obj.id,
        x: obj.x,
        y: obj.y,
        obj: obj
      });
      this.tintTile(this.config.tilemap, obj.x, obj.y, color); // actual
    });
  }

  handleWarps(enterTile) {
    let warps = this.registry.get('warps');
    if (warps.length === 0) { return; }

    let warp = warps.find(p => p.x === enterTile.x && p.y === enterTile.y);
    if (typeof warp === 'undefined') { return; }

    let warpProps = warp.obj.properties;
    let warpLocation = this.getPropertyValue(warpProps, 'warp', null);
    if (warpLocation === null || warpLocation === ''){ return; }

    this.cameras.main.fadeOut(this.cameraFade, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      let playerLocation = {
        x: this.getPropertyValue(warpProps, 'warp-x', 0),
        y: this.getPropertyValue(warpProps, 'warp-y', 0),
        dir: this.getPropertyValue(warpProps, 'warp-dir', 'down')
      };

      // same map, we dont need to move scene
      if (this.registry.get('map') === warpLocation) {
        this.warpPlayerInMap(playerLocation);
        this.cameras.main.fadeIn(this.cameraFade, 0, 0, 0);
        return;
      }

      // new map!
      this.scene.start(warpLocation, {
        playerLocation: playerLocation
      });
    });
  }

  interactTile(map, obj, color) {
    obj.x /= 32;
    obj.y /= 32;

    this.registry.get('interactions').push({
      x: obj.x,
      y: obj.y,
      obj: obj
    });
    this.tintTile(map, obj.x,    obj.y,     color); // actual
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
    this.gridEngine.create(this.config.tilemap, {
      characters: this.characters
    });

    // check if we have a playerLocation and warp to it
    if (typeof this.config.playerLocation.x !== 'undefined') {
      this.warpPlayerInMap(this.config.playerLocation);
    }

    // make players pokemon follow em
    this.gridEngine
      .positionChangeFinished()
      .subscribe(({ charId, exitTile, enterTile }) => {
        if (charId !== this.player.config.id) { return; }

        this.handleWarps(enterTile);
        this.handleObservers(enterTile, exitTile);

        // make the playerMon follow the player
        this.playerMon.moveTo(exitTile.x, exitTile.y);
        // this.playerMon.lookAt(this.player.config.id);
      });
  }

  updateCharacters(time, delta) {
    this.player.update(time, delta);
    this.playerMon.update(time, delta);

    if (this.mon.length > 0) {
      this.mon.forEach(function(mon) {
        mon.update(time, delta);
      });
    }
  }

  handleObservers(enterTile, exitTile) {
    // if we dont have any custom properties on the tile, nope out
    let tile = this.config.tilemap.getTileAt(enterTile.x, enterTile.y);
    if (tile === null) { return; }
    console.log(tile);
    let tileProps = tile.properties;
    if (tileProps.length === 0) { return; }


  }

  addPlayerToScene(x, y) {
    this.tintTile(this.config.tilemap,
      this.config.playerLocation.length > 0 ? this.config.playerLocation.x : x,
      this.config.playerLocation.length > 0 ? this.config.playerLocation.y : y,
      this.random_rgba()
    );

    this.player = new Player({
      id: 'player',
      texture: 'red',
      x: x,
      y: y,
      scene: this,
      collides: true,
      facingDirection: 'down',
    });
    this.registry.set('player', this.player);
    this.cameras.main.zoom = 1.6;
    this.cameras.main.startFollow(this.player.config.sprite, true);
    this.cameras.main.setFollowOffset(-this.player.config.sprite.width, -this.player.config.sprite.height)

    this.addPlayerMonToScene('RNG', x +1, y);
  }

  addPlayerMonToScene(monId, x, y) {
    if (monId == 'RNG') {
      monId = (Math.floor(Math.random() * 12) +1)
        .toString()
        .padStart(3, '0');
    }

    this.playerMon = new PkmnOverworld({
      id: 'playerMon',
      texture: monId.toString(),
      x: x,
      y: y,
      scene: this,
      follow: 'player',
      facingDirection: 'left',
      collides: false
    });
  }

  getPropertyValue(props, id, defValue) {
    if (typeof props === 'undefined' || props.length === 0) { return defValue; }
    let property = props.find(p => p.name === id);
    return typeof property === 'undefined' ? defValue : property.value;
  }

  getValue(obj, value, defValue) {
    return Phaser.Utils.Objects.GetValue(obj, value, defValue);
  }

  getTileProperties(x, y) {
    var tile = this.config.tilemap.getTileAt(x, y);
    if (tile) {
      return tile.properties.length > 0 ? tile.properties : {};
    }
    return {};
  }

  warpPlayerInMap(playerLocation) {
    let pos = {
      x: playerLocation.x,
      y: playerLocation.y
    };

    // move the player
    this.gridEngine.setPosition(this.player.config.id, pos);
    this.player.look(playerLocation.dir);

    // get the pokemon to be in the right spot
    this.gridEngine.setPosition(this.playerMon.config.id, this.player.getPosInBehindDirection());
  }

  random_rgba() {
      return '0x' + Math.floor(Math.random()*16777215).toString(16);
  }
}
