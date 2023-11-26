import gsap from 'gsap';
import * as PIXI from 'pixi.js';

import PixiContainer from "./PixiContainer";
import { Config } from '../config';
import { ViewProps } from './types';

export default class PixiDialog extends PixiContainer {
  viewProps: ViewProps;
  shadow: PIXI.Graphics;
  content: PixiContainer

  constructor({ viewProps }: { viewProps?: ViewProps } = {}) {
    super({ viewProps });
    this.view.visible = false;
  }

  onCreate() {
    this.shadow = new PIXI.Graphics();

    this.content = new PixiContainer();

    this.shadow
      .beginFill(0x201919)
      .drawRect(-Config.defaultWidth / 2, -Config.defaultHeight / 2, Config.defaultWidth, Config.defaultHeight);

    this.shadow.alpha = 0.7;
    this.shadow.interactive = true;

    this.view.addChild(this.shadow)
    this.mount(this.content);
  }

  show() {
    const isAlreadyVisible = this.view.visible;
    this.view.visible = true;

    !isAlreadyVisible && gsap.to(this.content.view.scale, {
      x: 1.15,
      y: 1.15,
      onComplete: () => {
        gsap.to(this.content.view.scale, {
          x: 1,
          y: 1,
        })
      }
    })
  }

  hide() {
    gsap.to(this.content.view.scale, {
      x: 1.05,
      y: 1.05,
      delay: 0.2,
      onComplete: () => {
        gsap.to(this.content.view.scale, {
          x: 0.7,
          y: 0.7,
          onComplete: () => {
            this.view.visible = false;
          }
        })
      }
    })
  }

}