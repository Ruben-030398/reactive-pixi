import { CombinedState } from "redux";
import PixiContainer from "../pixi/PixiContainer";
import { GameState } from "../store";
import PixiSprite from "../pixi/PixiSprite";
import PixiText from "../pixi/PixiText";
import PixiButton from "../pixi/PixiButton";
import store from "../store/store";

export default class Counter extends PixiContainer {
  counter: PixiText;

  constructor() {
    super({ viewProps: { x: 0, y: 0 } })

    this.onUpdate = this.onUpdate.bind(this);
  }

  onCreate(state?: GameState): void {
    const container = new PixiContainer();

    const sceneBg = new PixiSprite({
      textureKey: 'pixiBG',
    });

    this.counter = new PixiText({
      text: state.counter,
      style: {
        fontSize: 80,
        fontWeight: 'bold',
        fill: [
          "#FC0062",
          "#612876"
        ],
        fontFamily: "Verdana, Geneva, sans-serif",
      },
      viewProps: { y: 400 }
    });

    const incrementButton = new PixiButton({
      text: '+',
      onClick: () => {        
        store.dispatch({ type: 'INCREMENT' })
      },
      viewProps: {
        y: 400,
        x: -150,
      },
      textStyles: {
        fontSize: 85,
        fill: [
          "#FC0062",
          "#612876"
        ],
      }
    });

    incrementButton.textureView.view.width = 150;
    incrementButton.textureView.view.height = 80;

    const decrementButton = new PixiButton({
      text: '-',
      onClick: () => store.dispatch({ type: 'DECREMENT' }),
      viewProps: {
        y: 400,
        x: 150,
      },
      textStyles: {
        fontSize: 85,
        fill: [
          "#FC0062",
          "#612876"
        ],
      }
    });

    decrementButton.textureView.view.width = 150;
    decrementButton.textureView.view.height = 80;

    container.mount(sceneBg);

    container.mount(this.counter);

    container.mount(incrementButton);
    container.mount(decrementButton);

    this.mount(container);
  }

  onUpdate(count: number) {

    this.counter.view.text = count; 
  }
}