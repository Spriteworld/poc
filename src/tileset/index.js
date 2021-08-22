import gen3inside from './gen3_inside.png';
import gen3outside from './gen3_outside.png';
import red from './characters/red.png';
import ace_trainer from './characters/ace_trainer.png';
import poke_kid from './characters/poke_kid.png';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
  images[item.replace('./', '').replace('.png', '')] = r(item);
  });
  return images;
}

var pokemon = importAll(require.context('./pokemon', false, /\.(png)$/));



export {
  gen3inside,
  gen3outside,
  red,
  ace_trainer,
  poke_kid,

  pokemon
};
