import { AnyAction, Dispatch, combineReducers, createStore } from "redux";

function counter(state = 0, action) {    
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const reducer = combineReducers({
  counter,
})

const store = createStore(reducer);

export default store;

export type AppDispatch = typeof store.dispatch;
export type GameState = ReturnType<typeof reducer>;
export type TypedDispatch = Dispatch<AnyAction>;

