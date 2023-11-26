import * as PIXI from 'pixi.js';

import PixiLoader from './PixiLoader';
import { GameState } from '../store';
import PixiDisplayObject from './PixiDisplayObject';
import { DisplayObjectType, ViewProps } from './types';

export default class PixiSprite extends PixiDisplayObject{
  textureKey?: string;
  view: PIXI.Sprite;
  viewProps?: ViewProps;
  constructor({ textureKey, viewProps }: { textureKey?: string, viewProps?: ViewProps}){
    super({ displayObjectType: DisplayObjectType.Sprite });
    this.textureKey = textureKey;    
    
    this.view = new PIXI.Sprite();

    this.view.texture = textureKey ?  PIXI.Texture.from((PixiLoader.loader.get(textureKey)).baseTexture) : PIXI.Texture.WHITE;

    this.view.anchor.set(0.5, 0.5);

    this.view.position.set(viewProps?.x || 0, viewProps?.y || 0);

    this.view.scale.x = viewProps?.scaleX ? viewProps?.scaleX : 1;
    this.view.scale.y = viewProps?.scaleY ? viewProps?.scaleY : 1;
  }

  changePicture(textureKey: string) {    
    const texture = PIXI.Texture.from((PixiLoader.loader.get(textureKey)).baseTexture);

    this.view.texture = texture;
  }

  onCreate(state?: GameState): void {
    
  }

  onUpdate<T>(state?: T): void {
    
  }
}
