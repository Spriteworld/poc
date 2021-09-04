import gen3inside from './gen3_inside.png';
import gen3outside from './gen3_outside.png';
import rseinside from './rse_inside.png';
import rseoutside from './rse_outside.png';
import red from './characters/red.png';

function importAll(r, suffix) {
  let images = {};
  r.keys().map((item, index) => {
  images[item.replace('./', '').replace('.png', '')+(suffix || '')] = r(item);
  });
  return images;
}

var trainers = importAll(require.context('./characters/', false, /\.(png)$/));
var pokemon = importAll(require.context('./overworld/pokemon/', false, /\.(png)$/));
var pokemon_shiny = importAll(require.context('./overworld/pokemon_shiny/', false, /\.(png)$/), 's');
// var pokemon_home = importAll(require.context('./battlescene/normal/', false, /\.(png)$/), 's');

export {
  gen3inside,
  gen3outside,
  rseinside,
  rseoutside,
  red,
  trainers,

  pokemon,
  pokemon_shiny,
  // pokemon_home,
};
