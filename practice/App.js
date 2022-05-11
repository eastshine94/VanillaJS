import Component from './Component.js';
import Items from './src/components/Items.js';

export default class App {
  constructor($target) {
    new Items($target);
  }
}
