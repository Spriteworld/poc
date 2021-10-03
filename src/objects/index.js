import Game from './Game.js';
import Character from './characters/Character.js';
import Player from './characters/Player.js';
import NPC from './characters/Npc.js';
import PkmnOverworld from './characters/PkmnOverworld.js';

import BattleTrainer from './battlescene/Trainer.js';
import BattleTeam from './battlescene/Team.js';
import BattlePokemon from './battlescene/Pokemon.js';

import Menu from './menus/Menu.js';
import MenuItem from './menus/MenuItem.js';
import PauseMenu from './menus/PauseMenu.js';
import BattleMenu from './menus/BattleMenu.js';
import PokemonTeamMenu from './menus/PokemonTeamMenu.js';
import ActivePokemonMenu from './menus/ActivePokemonMenu.js';
import AttackMenu from './menus/AttackMenu.js';
import BagMenu from './menus/BagMenu.js';

import NPCScripts from './scripts/npcs.js';

import * as ObjectTypes from '../tileset/objecttypes.json';

export {
    Game,
    Character,
    Player,
    NPC,
    PkmnOverworld,

    BattleTrainer,
    BattleTeam,
    BattlePokemon,

    Menu,
    MenuItem,
    PauseMenu,
    BattleMenu,
    PokemonTeamMenu,
    ActivePokemonMenu,
    AttackMenu,
    BagMenu,

    NPCScripts,

    ObjectTypes
};
