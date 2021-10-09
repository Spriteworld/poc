import Phaser from 'phaser';
import {Player, NPC, PkmnOverworld, ObjectTypes} from '@Objects';

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

    this.debug = true;
    this.cameraFade = 150;
    this.totalMon = 386;
    // console.log(['Loading Scene', config.mapName]);
    // console.log(this);
  }

  init(data) {
    // console.log(['init data', data]);
    this.config = { ...this.config, ...data };
    this.player = {};
    this.playerMon = {};
    this.characters = [];
    this.mon = [];
    this.warps = [];
  }

  preloadMap () {
    this.load.tilemapTiledJSONExternal(this.config.mapName, this.config.map);
  }

  loadMap () {
    this.cameras.main.fadeIn(this.cameraFade, 0, 0, 0)
    var tilemap = this.make.tilemap({key: this.config.mapName});
    this.config.tilemap = tilemap;
    this.registry.set('scene', this.config.mapName);
    this.registry.set('triggerToast', this.config.mapName);

    // all the tilesets!
    let tilesets = [
      tilemap.addTilesetImage('gen3_inside', 'gen3_inside'),
      tilemap.addTilesetImage('gen3_outside', 'gen3_outside'),
      tilemap.addTilesetImage('rse_inside', 'rse_inside'),
      tilemap.addTilesetImage('rse_outside', 'rse_outside')
    ];

    // load all the layers!
    tilemap.layers.forEach((layer) => {
      tilemap
        .createLayer(layer.name, tilesets)
        .setName(layer.name);
    });

    this.iceTiles = this.getTilesWithProperty('sw_slide');
    this.spinTiles = this.getTilesWithProperty('sw_spin');
    this.stopTiles = this.getTilesWithProperty('sw_stop');

    this.objects = tilemap.getObjectLayer('interactions');
    if (this.objects !== null) {
      this.registry.set('interactions', []);
      this.registry.set('warps', []);
      this.initSigns();
      this.initNpcs();
      this.initPkmn();
      this.initWarps();
      this.initPlayer();

      this.debugObjects();
    }

    this.animatedTiles.init(tilemap);
    // PhaserGUIAction(this);
  }

  debugObjects() {
    if(this.debug !== true) return;

    // this.add.grid(0, 0, this.config.tilemap.widthInPixels, this.config.tilemap.heightInPixels, 32, 32)
    //   .setOrigin(0, 0)
    //   .setOutlineStyle(0x000000)
    //   .setDepth(9999999)
    // ;

    let colors = {};
    Object.values(ObjectTypes).forEach((obj) => {
      colors[obj.name] = obj.color;
    });

    let graphics = this.add.graphics()
    Object.values(this.config.tilemap.getObjectLayer('interactions').objects).forEach((obj) => {

      let text = this.add.text(0, 0, obj.name, {
          font: '12px',
          align: 'justify',
          padding: 3,
          color: '#fff',
          backgroundColor: (this.getValue(colors, obj.type, '#000')).substr(0, 7),
          shadow: {
            stroke: '#000',
            offsetX: 1,
            offsetY: 1,
          }
        })
      ;

      // console.log(obj);
      let tile = this.add.rectangle(obj.x, obj.y, obj.width, obj.height);
      tile.setOrigin(0,0);
      tile.setStrokeStyle(1, 0x1a65ac);
      var debugObj = this.add.container(0,0, [
        tile,
        Phaser.Display.Align.In.TopCenter(text, this.add.zone(obj.x-5, obj.y-15, obj.width+10, obj.height+10).setOrigin(0,0)),
      ]);
      debugObj.setDepth(9999999);
    });
  }

  initSigns() {
    let signs = this.config.tilemap.filterObjects('interactions', (obj) => obj.type === 'sign');
    if (signs.length === 0) { return; }

    signs.forEach((sign) => {
      this.interactTile(this.config.tilemap, sign, 0x00afe4);
    });
  }

  initPlayer() {
    if (Object.keys(this.config.playerLocation).length != 0) {
      this.addPlayerToScene(this.config.playerLocation.x, this.config.playerLocation.y);
      return;
    }

    let spawn = this.config.tilemap.filterObjects('interactions', (obj) => obj.type === 'playerSpawn');
    if (spawn.length === 0) { throw 'No player spawn found'; }
    if (spawn.length > 1) { throw 'Only 1 player spawn can be in the map.'; }

    this.addPlayerToScene(spawn[0].x / 32, spawn[0].y / 32);
  }

  initNpcs() {
    let npcs = this.config.tilemap.filterObjects('interactions', (obj) => obj.type === 'npc');
    if (npcs.length === 0) { return; }

    this.npcs = this.add.group();
    this.npcs.runChildUpdate = true;
    let color = this.random_rgba();
    npcs.forEach((npc) => {
      let npcObj = new NPC({
        id: npc.name,
        texture: this.getPropertyValue(npc.properties, 'texture'),
        x: npc.x / 32,
        y: npc.y / 32,
        scene: this,
        spin: this.getPropertyValue(npc.properties, 'spin'),
        'spin-rate': this.getPropertyValue(npc.properties, 'spin-rate'),
        'facing-direction': this.getPropertyValue(npc.properties, 'facing-direction', 'down'),
        move: this.getPropertyValue(npc.properties, 'move'),
        'move-rate': this.getPropertyValue(npc.properties, 'move-rate'),
        'move-radius': this.getPropertyValue(npc.properties, 'move-radius'),
      });
      this.npcs.add(npcObj);
      this.interactTile(this.config.tilemap, npc, color);
    });
  }

  initPkmn() {
    let pkmn = this.config.tilemap.filterObjects('interactions', (obj) => obj.type === 'pkmn');
    if (pkmn.length === 0) { return; }

    this.pkmn = this.add.group();
    this.pkmn.runChildUpdate = true;
    pkmn.forEach((npc) => {
      this.addMonToScene(
        this.getPropertyValue(npc.properties, 'texture'),
        npc.x / 32,
        npc.y / 32,
        {
          id: npc.name,
          scene: this,
          spin: this.getPropertyValue(npc.properties, 'spin'),
          'spin-rate': this.getPropertyValue(npc.properties, 'spin-rate'),
          'facing-direction': this.getPropertyValue(npc.properties, 'facing-direction', 'down'),
          move: this.getPropertyValue(npc.properties, 'move'),
          'move-rate': this.getPropertyValue(npc.properties, 'move-rate'),
          'move-radius': this.getPropertyValue(npc.properties, 'move-radius'),
          'shiny': this.getPropertyValue(npc.properties, 'shiny', false),
        }
      );
    });
  }

  initWarps() {
    let warps = this.config.tilemap.filterObjects('interactions', (obj) => obj.type === 'warp');
    if (warps.length === 0) { return; }

    let color = this.random_rgba();
    warps.forEach((obj) => {
      this.registry.get('warps').push({
        name: obj.id,
        x: obj.x / 32,
        y: obj.y / 32,
        obj: obj
      });
    });
  }

  initLayerTransitions() {
    let transitions = this.config.tilemap.filterObjects('interactions', (obj) => obj.type === 'layerTransition');
    if (transitions.length === 0) { return; }

    let color = this.random_rgba();
    transitions.forEach((obj) => {
      this.gridEngine.setTransition(
        { x: obj.x /32, y: obj.y /32 },
        this.getPropertyValue(obj.properties, 'from'),
        this.getPropertyValue(obj.properties, 'to')
      );
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

    this.player.disableMovement();
    this.cameras.main.fadeOut(this.cameraFade, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      let playerLocation = {
        x: this.getPropertyValue(warpProps, 'warp-x', 0),
        y: this.getPropertyValue(warpProps, 'warp-y', 0),
        dir: this.getPropertyValue(warpProps, 'warp-dir', 'down'),
        charLayer: this.getPropertyValue(warpProps, 'layer', 'ground')
      };

      // same map, we dont need to move scene
      if (this.registry.get('map') === warpLocation) {
        this.warpPlayerInMap(playerLocation);
        this.cameras.main.fadeIn(this.cameraFade, 0, 0, 0);
        this.player.enableMovement();
        return;
      }

      // new map!
      this.scene.start(warpLocation, {
        playerLocation: playerLocation
      });
      this.player.enableMovement();
    });
  }

  interactTile(map, obj, color) {
    this.registry.get('interactions').push({
      x: obj.x / 32,
      y: obj.y / 32,
      obj: obj
    });
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

    if (this.objects !== null) {
      this.initLayerTransitions();
    }

    // check if we have a playerLocation and warp to it
    if (typeof this.config.playerLocation.x !== 'undefined') {
      this.warpPlayerInMap(this.config.playerLocation);
    }

    // handle ice & spin tiles
    this.gridEngine
      .positionChangeStarted()
      .subscribe(({ charId, exitTile, enterTile }) => {
        if (![this.player.config.id].includes(charId)) {
          return;
        }

        let isIceTile = this.iceTiles.some(tile => {
          return tile[0] == enterTile.x && tile[1] == enterTile.y;
        });
        if (isIceTile) {
          let dir = this.gridEngine.getFacingDirection(this.player.config.id);
          this.player.stopSpinning();
          this.player.startSliding(dir);
        } else {
          if (this.player.slidingDir !== null) {
            this.player.stopSliding();
          }
        }

        let isSpinTile = this.spinTiles.some(tile => {
          return tile[0] == enterTile.x && tile[1] == enterTile.y;
        });

        if (isSpinTile) {
          let props = this.getTileProperties(enterTile.x, enterTile.y);
          let dir = this.getValue(props, 'sw_spin', false);
          if (dir !== false) {
            this.player.stopSliding();
            this.player.startSpinning(dir);
          }
        }

        let isStopTile = this.stopTiles.some(tile => {
          return tile[0] == enterTile.x && tile[1] == enterTile.y;
        });
        if (isStopTile) {
          if (this.player.spinningDir !== null) {
            this.player.stopSpinning();
          }
        }
      });

    this.gridEngine
      .movementStopped()
      .subscribe(({ charId, direction }) => {
        if (![this.player.config.id].includes(charId)) {
          return;
        }
        if (this.player.slidingDir !== null) {
          this.player.stopSliding();
        }
      });

    // make players pokemon follow em
    this.gridEngine
      .positionChangeFinished()
      .subscribe(({ charId, exitTile, enterTile }) => {
        if (![this.player.config.id].includes(charId)) {
          return;
        }

        // setup handlers etc
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
      'facing-direction': 'down',
    });
    this.registry.set('player', this.player);
    this.cameras.main.zoom = 1.6;
    this.cameras.main.startFollow(this.player.config.sprite, true);
    this.cameras.main.setFollowOffset(-this.player.config.sprite.width, -this.player.config.sprite.height)

    this.playerMon = this.addMonToScene('RNG', x +1, y, {
      id: 'playerMon',
      follow: this.player.config.id,
      collides: false,
      move: false,
      spin: false,
    });
  }

  addMonToScene(monId, x, y, config) {
    if (monId == 'RNG') {
      monId = (Math.floor(Math.random() * this.totalMon) +1);
    }
    if (monId.length !== 3) {
      monId = monId.toString().padStart(3, '0');
    }

    // check for shiny
    let texture = monId.toString();
    if (this.getValue(config, 'shiny', false)) {
      texture += 's';
    }

    let pkmnDef = {...{
      id: 'mon'+this.mon.length,
      texture: texture,
      x: x,
      y: y,
      scene: this,
      spin: true,
      'spin-rate': (Math.floor(Math.random() * 1000) +1)
    }, ...config };

    let pkmn = new PkmnOverworld(pkmnDef);
    this.mon.push(pkmn);
    this.interactTile(this.config.tilemap, pkmnDef, 0x000000);
    return pkmn;
  }

  getPropertyValue(props, id, defValue) {
    if (typeof props === 'undefined' || Object.values(props).length === 0) {
      return defValue;
    }
    let property = props.find(p => p.name === id);
    return typeof property === 'undefined' ? defValue : property.value;
  }

  getValue(obj, value, defValue) {
    return Phaser.Utils.Objects.GetValue(obj, value, defValue);
  }

  getTileProperties(x, y) {
    var props = [];
    this.config.tilemap.getTileLayerNames().forEach(layer => {
      let layerTiles = this.config.tilemap.getTilesWithin(x, y, 1, 1, {}, layer);

      layerTiles.forEach(layerTile => {
        if (layerTile) {
          props = {...props, ...layerTile.properties};
        }
      });
    });

    return props;
  }

  warpPlayerInMap(playerLocation) {
    let pos = {
      x: playerLocation.x,
      y: playerLocation.y
    };

    // move the player
    this.gridEngine.setPosition(this.player.config.id, pos, playerLocation.layer);
    this.player.look(playerLocation.dir);

    // get the pokemon to be in the right spot
    this.gridEngine.setPosition(this.playerMon.config.id, this.player.getPosInBehindDirection(), playerLocation.layer);
  }

  getTilesWithProperty(property) {
    var tiles = []
    this.config.tilemap.getTileLayerNames().forEach(layer => {
      let layerTiles = this.config.tilemap.getTilesWithin(0, 0, this.config.tilemap.width, this.config.tilemap.height, {}, layer);

      layerTiles.forEach(layerTile => {
        if (layerTile && this.getValue(layerTile.properties, property, false)) {
          tiles.push([layerTile.x, layerTile.y]);
          return;
        }
      });
    });

    return tiles;
  }

  random_rgba() {
    return '0x' + Math.floor(Math.random()*16777215).toString(16);
  }
}
