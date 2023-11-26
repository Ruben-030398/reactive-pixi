import * as PIXI from 'pixi.js';


class PixiLoader {
  loader: typeof PIXI.Assets
  atlas: { [key: string]: any }
  constructor(){
    this.loader = PIXI.Assets
  }

  async loadAssets(assets: { [key: string]: any }) {
    this.atlas = { ...this.atlas, ...assets };

    Object.entries(assets).forEach(([name, imageSrc]) => {
      this.loader.add({ alias: name , src: imageSrc });
    })
  
    return await this.loader.load(Object.keys(assets))  
  }
}

export default new PixiLoader()
