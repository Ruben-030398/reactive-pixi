import PixiContainer, { ContainerProps } from './PixiContainer';

export default abstract class PixiScene extends PixiContainer {
  constructor(containerProps: ContainerProps) {
    super(containerProps);
  }

  abstract show(): void;

  abstract hide(): void;

  destroy(){
    this.view.parent.removeChild(this.view)
  } 
}