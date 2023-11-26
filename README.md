# PixiJS Boilerplate

This PixiJS boilerplate provides pre-built components for common game elements and seamless integration with Redux for state management.

## Components

- **PixiAnimatedSprite**
- **PixiButton**
- **PixiContainer**
- **PixiDialog**
- **PixiScene**
- **PixiSprite**
- **PixiText**

These components are designed to streamline the development of PixiJS-based games by offering reusable and customizable elements.

## Redux Integration

We've made it easy to integrate Redux into your PixiJS game. Check out the example below to see how it works:

### Example: scene.ts

```typescript
export class GamePlay extends PixiScene {
  mask: PIXI.Graphics;
  counter: PixiText;

  constructor() {
    super({ origX: Config.halfWidth, origY: Config.halfHeight, scale: ScaleTypes.Scale });
    this.onCreate = this.onCreate.bind(this);
  }

  hide() {
    // Your hide logic here
  }

  onCreate(state?: GameState): void {
    const counter = new Counter();

    this.mount(counter, state => state.counter);
  }

  show() {
    const state = window.store.getState();

    this.onCreate(state);
  }
}
```

### Example: components/counter.ts

```ts
export class Counter extends PixiContainer {
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
      onClick: () => store.dispatch({ type: 'INCREMENT' })
    });

    const decrementButton = new PixiButton({
      text: '-',
      onClick: () => store.dispatch({ type: 'DECREMENT' })
    });

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
```
