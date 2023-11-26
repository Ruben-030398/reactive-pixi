import { AnyAction } from 'redux';
import { GameState } from '../store';
import { DisplayObjectType, ScaleTypes, ViewProps } from './types';
import PixiDisplayObject from './PixiDisplayObject';
import { Config } from '../config';
import { connect } from '../store/utils/connect';

export interface ContainerProps { origX?: number; origY?: number; scale?: ScaleTypes, viewProps?: ViewProps };
export default class PixiContainer extends PixiDisplayObject {
  origX?: number;
  origY?: number;
  scale?: ScaleTypes;
  viewProps?: ViewProps;

  constructor({ origX = 0, origY = 0, scale, viewProps }: ContainerProps= {}) {
    super({
      displayObjectType: DisplayObjectType.Container,
      viewProps,
    });
    this.origX = origX;
    this.origY = origY;
    this.scale = scale;

    this.onResize = this.onResize.bind(this);

    if (this.scale) {
      window.addEventListener('resize', this.onResize);
      this.onResize();
    }
  }

  private onResize() {
    const widthScale = window.innerWidth / Config.defaultWidth;
    const heightScale = window.innerHeight / Config.defaultHeight;

    this.view.position = { x: this.origX - (this.origX * (1 - widthScale)), y: this.origY - (this.origY * (1 - heightScale)) }

    switch (this.scale) {
      case ScaleTypes.MaxScale: {
        const maxScale = Math.max(widthScale, heightScale);
        this.view.scale = { x: maxScale, y: maxScale };
        break;
      }
      case ScaleTypes.FullScale: {
        this.view.scale = { x: widthScale, y: heightScale };
        break;
      }
      default: {
        this.view.scale = { x: Math.min(widthScale, heightScale), y: Math.min(widthScale, heightScale) };
        break;
      }
    }
  }

  mount<T>(child: PixiDisplayObject, getter?: (state: GameState) => T) {    
    const state = window.store.getState();

    this.view.addChild(child.view);

    child.onCreate = child.onCreate.bind(child, state);

    child.onCreate();

    if (getter) {
      connect(child, getter)();
    }
  }


  onCreate(state?: GameState): void {
    
  }

  onUpdate(state: any): void {
    
  }


  create() {
    if(this.onCreate){
      const state = window.store.getState();
      
      this.onCreate = this.onCreate.bind(this, state);
      this.onUpdate = this.onUpdate.bind(this, state);
    }
  }
}
