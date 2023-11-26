import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import PixiSprite from './PixiSprite';
import PixiText from './PixiText';
import PixiContainer from './PixiContainer';
import { ViewProps } from './types';

export default class PixiButton extends PixiContainer {
  pixiText?: PixiText;
  textureView: PixiSprite;

  constructor({ 
    textureKey, 
    onClick, 
    text,
    textStyles,
    viewProps,
    textViewProps,
    eventMode = 'dynamic',
  }: { 
    pixiText?: PixiText,
    textureKey?: string,
    onClick: any,
    text?: string | number,
    textStyles?:  Partial<PIXI.ITextStyle> | PIXI.TextStyle,
    viewProps?: ViewProps;
    textViewProps?: ViewProps;
    eventMode?: PIXI.EventMode;
  }){
    super({ viewProps });

    this.textureView = new PixiSprite({
      textureKey,
    })

    this.view.eventMode = eventMode;

    const initialScaleX = typeof viewProps?.scaleX === 'number' ? viewProps.scaleX : 1;
    const initialScaleY = typeof viewProps?.scaleY === 'number' ? viewProps.scaleY : 1;

    const diffX = 0.07;
    const diffY = 0.07;

    this.view.on('pointerdown', (e) => {
      onClick(e);
      gsap.to(this.view.scale, {
        x: initialScaleX + diffX,
        y: initialScaleY + diffY,
        ease: "sine.out",
        duration: 0.2,
        onComplete: () => {
          gsap.to(this.view.scale, {
            x: initialScaleX,
            y: initialScaleY,
            ease: "sine.out",
            duration: 0.2,
          })
        }
      })
    });

    this.mount(this.textureView);

    if (typeof text === 'number' || typeof text === 'string') {
      this.pixiText = new PixiText({ text, style: textStyles, viewProps: textViewProps });
      this.mount(this.pixiText);
    }
  }
}
