import * as PIXI from 'pixi.js';

import PixiScene from '../../pixi/PixiScene';
import PixiText from '../../pixi/PixiText';
import { GameState } from '../../store';
import { Config } from '../../config';
import { ScaleTypes } from '../../pixi/types';
import Counter from '../../components/Counter';

export class GamePlay extends PixiScene {
  mask: PIXI.Graphics;
  counter: PixiText

  constructor() {
    super({ origX: Config.halfWidth, origY: Config.halfHeight, scale: ScaleTypes.Scale });
    this.onCreate = this.onCreate.bind(this);

    window.store.subscribe(this.onUpdate.bind(this));
  }

  hide() {

  }

  onCreate(state?: GameState): void {
    const counter = new Counter();

    this.mount(counter, state => state.counter);
  }

  show() {
    const state = window.store.getState();

    this.onCreate(state);
  }
}