import * as PIXI from 'pixi.js';

import { GameState } from '../store';
import { DisplayObjectType, ViewProps } from './types';


const defaultViewProps: ViewProps = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
  anchor: [0.5, 0.5]
}

const getDisplayObjectByType = (type: DisplayObjectType) => {
  switch(type) {
    case DisplayObjectType.Container:
      return PIXI.Container;
    case DisplayObjectType.Sprite:
      return PIXI.Sprite;
    case DisplayObjectType.Text:
      return PIXI.Text;
    case DisplayObjectType.AnimatedSprite:
      return PIXI.Container;
    default: return PIXI.Container
  }
}

interface PixiDisplayObjectType {
  view: PIXI.Container | PIXI.Sprite
  viewProps?: ViewProps
  children: Array<PixiDisplayObject>
  DisplayObject: PIXI.DisplayObject
}

export default abstract class PixiDisplayObject implements PixiDisplayObjectType {
  view: PIXI.Container | PIXI.Sprite
  viewProps?: ViewProps
  children: Array<PixiDisplayObject>
  DisplayObject: PIXI.DisplayObject

  abstract onCreate?(state?: GameState): void;
  abstract onUpdate?(state: any): void;

  constructor({ 
    displayObjectType, 
    viewProps
    } : { 
      viewProps?: ViewProps,
      displayObjectType: DisplayObjectType,
      id?: string, 
  }) {
    const DisplayObject = getDisplayObjectByType(displayObjectType);

    this.view = new DisplayObject();

    this.children = [];

    this.view.x = viewProps?.x ? viewProps?.x : defaultViewProps.x;
    this.view.y = viewProps?.y ? viewProps?.y : defaultViewProps.y;

    this.view.scale.x = viewProps?.scaleX ? viewProps?.scaleX : defaultViewProps.scaleX;
    this.view.scale.y = viewProps?.scaleY ? viewProps?.scaleY : defaultViewProps.scaleY;
  }

  changeAnchor({ x, y }: { x?: number, y?: number}){
    this.view.pivot.x = this.view.width * (x ? x : defaultViewProps?.anchor[0]);
    this.view.pivot.y = this.view.height * (y ? y : defaultViewProps?.anchor[1]);
  }

  removeChild(child: PixiDisplayObject) {
    this.view.removeChild(child.view);
    this.children.filter(_child => _child !== child);
  }

}