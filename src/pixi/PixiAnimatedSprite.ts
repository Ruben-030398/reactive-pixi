import * as PIXI from 'pixi.js';

import PixiContainer from './PixiContainer';
import { GameState } from '../store';
import PixiLoader from './PixiLoader';
import { ViewProps } from './types';

export default class PixiAnimatedSprite extends PixiContainer{
  view: PIXI.Container;
  animatedSprite: PIXI.AnimatedSprite;
  viewProps?: ViewProps;
  animationSpeed?: number;
  textureKey: string; 

  constructor({
     viewProps,
     textureKey, 
     texturesCount,
     loop = true,
     onComplete,
     onLoop,
     animationSpeed = 0.1,
    }: { 
      viewProps?: ViewProps, 
      textureKey: string, 
      texturesCount: number, 
      loop?: boolean,
      onComplete?: () => void,
      onLoop?: () => void,
      animationSpeed?: number;
    }){
    super({ viewProps })
    const textures = [];

    this.textureKey = textureKey;

    let atlas = {};
  
    for(let i = 1; i <= texturesCount; i++) {
      textures.push(PIXI.Texture.from(atlas[`${this.textureKey}${i}`]));
    }

    this.animationSpeed = animationSpeed;

    const animatedSprite = new PIXI.AnimatedSprite(textures);

    this.animatedSprite = animatedSprite;

    this.animatedSprite.animationSpeed = this.animationSpeed;

    this.animatedSprite.play();

    this.animatedSprite.anchor.set(0.5, 0.5);

    this.animatedSprite.loop = !!loop;

    if (!loop && onComplete) {
      this.animatedSprite.onComplete = onComplete;
    }

    if(onLoop) this.animatedSprite.onLoop = onLoop;
    
    this.view.addChild(this.animatedSprite);

    this.changeTextures = this.changeTextures.bind(this);
  }

  changeTextures({
    textureKey,
    texturesCount,
    animationSpeed,
    loop,
    onComplete,
    onLoop,
  } : {
    textureKey: string, 
    texturesCount: number, 
    animationSpeed?: number,
    loop: boolean,
    onComplete?: () => void,
    onLoop?: () => void,
  }) {

    const atlas = PixiLoader.atlas;

    if (this.textureKey === textureKey) return

    this.textureKey = textureKey; 

    const textures = [];

    for(let i = 1; i <= texturesCount; i++) {
      textures.push(PIXI.Texture.from(atlas[`${this.textureKey}${i}`]));
    }

    this.animatedSprite.textures = textures;

    this.animatedSprite.anchor.set(0.5, 0.5);

    this.animatedSprite.loop = loop;

    this.animatedSprite.animationSpeed = animationSpeed || this.animationSpeed;

    if (onComplete) {
      this.animatedSprite.onComplete = onComplete;
    }

    if (onLoop) {
      this.animatedSprite.onLoop = onLoop;
    }

    this.animatedSprite.play();

  }

  onCreate(state?: GameState): void {
    
  }

  onUpdate(state?: GameState): void {
    
  }
}