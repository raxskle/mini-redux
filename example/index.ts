import { applyMiddleware, createStore } from "../src/index";
import { Action } from "../src/typings";

import logger from "../src/middleware/logger";
import thunk from "../src/middleware/thunk";

function counterReducer(
  state = 0,
  action: Action<"incremented" | "decremented">
) {
  switch (action.type) {
    case "incremented":
      return state + 1;
    case "decremented":
      return state - 1;
    default:
      return state;
  }
}

export const store = createStore(
  counterReducer,
  applyMiddleware(logger, thunk)
);

console.log("store state", store.getState());

store.dispatch({ type: "incremented" });

console.log("new state", store.getState());

// store state 0
// incremented 执行
// prev state 0
// next state 1
// new state 1
