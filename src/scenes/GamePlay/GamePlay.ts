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
  }

  hide() {

  }

  onCreate(): void {
    const counter = new Counter();

    this.mount(counter, state => state.counter);
  }

  show() {
    this.onCreate();
  }
}