import isEqual from 'lodash/isEqual'
import PixiDisplayObject from "../../pixi/PixiDisplayObject";
import store, { GameState } from "../store";

export const connect = (child: PixiDisplayObject, getter: (state: GameState) => void) => {
  const state = store.getState();
  
  let prevState = getter(state);

  return () => {
    store.subscribe(() => {
      const newState = getter(store.getState());

      if (!isEqual(prevState, newState)) {

        prevState = newState;

        child.onUpdate(newState)
      }
    })
  }
}