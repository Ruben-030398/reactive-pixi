import { Game } from './game';
import { GamePlay } from './scenes';
import PixiLoader from './pixi/PixiLoader';
import { Howler } from 'howler';
import store from './store/store';
import { mainAtlas } from './assets';

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState == "visible") {
    Howler.mute(false);
  } else {
    Howler.mute(true);
  }
});

declare global {
    interface Window { 
      game: Game; 
      store: typeof store;
      __PIXI_APP__: typeof game.pixiApp
    }
}

const game = new Game();

window.store = store;

window.game = game;

window.__PIXI_APP__ = game.pixiApp;

window.onload = async () => {

  await PixiLoader.loadAssets(mainAtlas); // initial assets

  game.pixiApp.start();

  const GamePlayScene = new GamePlay();

  GamePlayScene.create();

  game.pixiApp.addScene(GamePlayScene.view);

  GamePlayScene.show();
}
