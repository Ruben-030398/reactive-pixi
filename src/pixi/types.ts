export enum ScaleTypes {
  Scale = 'scale',
  MaxScale = 'maxScale',
  FullScale = 'fullScale',
}

export enum DisplayObjectType  {
  Container = 'Container',
  Sprite = 'Sprite',
  Text = 'Text',
  AnimatedSprite = 'AnimatedSprite',
}

export enum GameScenes {
  GAME_PLAY = 'GAME_PLAY',
}


export  interface ViewProps  {
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  anchor?: [number, number]
}