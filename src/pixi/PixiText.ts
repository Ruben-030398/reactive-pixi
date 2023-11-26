import * as PIXI from 'pixi.js';
import { GameState } from '../store';
import PixiDisplayObject from './PixiDisplayObject';
import { DisplayObjectType, ViewProps } from './types';

export default class PixiText extends PixiDisplayObject{
  text: string | number;
  style?: Partial<PIXI.ITextStyle> | PIXI.TextStyle;
  view: PIXI.Text

  constructor({ 
    text, 
    style,
    viewProps,
  }: { 
    text:  string | number, 
    style?: Partial<PIXI.ITextStyle> | PIXI.TextStyle; 
    viewProps?: ViewProps;
  }){
    super({ displayObjectType: DisplayObjectType.Text });

    this.text = text;

    this.view = new PIXI.Text(text);

    this.view.style = style;

    this.view.anchor.set(0.5, 0.5);

    this.view.position.set(viewProps?.x || 0, viewProps?.y || 0);

    this.view.scale.set(typeof viewProps?.scaleX === 'number' ? viewProps?.scaleX : 1, typeof viewProps?.scaleY === 'number' ? viewProps?.scaleY : 1);
  }

  onCreate(state: GameState): void {
    
  }

  onUpdate<T>(state: T): void {
    
  }
}