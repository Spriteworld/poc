export default class {
  constructor(config) {
    this.name = null;
    this.team = {};

    if (config) {
      Object.assign(this, config);
    }
  }

  debug() {
    console.log('BATTLETRAINER');
    console.log(this);
  }
}
