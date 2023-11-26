import PIXIApp from './pixi/PixiApp';
import PixiScene from './pixi/PixiScene';
import { GameScenes } from './pixi/types';
import './styles.css';

export class Game {
  pixiApp: PIXIApp;
  scenes: { [key in GameScenes]?: PixiScene };


  constructor() {
    this.pixiApp = new PIXIApp();
    this.scenes = {};
  }
}
