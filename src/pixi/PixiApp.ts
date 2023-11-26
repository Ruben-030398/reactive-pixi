import * as PIXI from 'pixi.js';

export default class PIXIApp {
  pixi: PIXI.Application<PIXI.ICanvas>;
  mainContainer: PIXI.Container<PIXI.DisplayObject> 

  constructor() {
    this.pixi = new PIXI.Application({
      background: '#181A21',
      width: window.innerWidth,
      height: window.innerHeight,
      resizeTo: window,
   });

   this.mainContainer = new PIXI.Container();

   this.start = this.start.bind(this);
  }

  start() {
    document.body.appendChild(this.pixi.view as HTMLCanvasElement);
    
    this.pixi.stage.addChild(this.mainContainer);

    this.pixi.ticker.add((delta) => {
      this.pixi.render();
    });
  }

  addScene(scene: PIXI.DisplayObject) {
    this.mainContainer.addChild(scene);
  }
}

window.PIXI = PIXI;

declare global {
  interface Window { 
    PIXI: typeof PIXI; 
  }
}
