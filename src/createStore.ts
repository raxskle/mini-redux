import { Reducer, Store, Dispatch, AnyAction } from "./typings";

// 创建store，包含基本的方法
export default function createStore<S, A extends AnyAction>(
  reducer: Reducer<S, A>,
  enhancer?: any
): Store<S, A> {
  // 如果传入enhancer，那么应用enhancer来创建store
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState: S | undefined;
  let currentListeners: Array<() => void> = [];

  // 得到state
  const getState = () => currentState;

  // 将effect订阅更新，使得当更新state时可以更新UI
  const subscribe: Store<S, A>["subscribe"] = (fn) => {
    currentListeners.push(fn);
    // 返回函数可以取消订阅
    return () => {
      const index = currentListeners.findIndex(fn);
      currentListeners.splice(index, 1);
    };
  };

  // 根据action更新state，并执行effect
  const dispatch: Dispatch<A> = (action) => {
    currentState = reducer(currentState, action);
    currentListeners.forEach((listener) => listener());
  };

  dispatch({ type: "init" } as A);

  return {
    getState,
    subscribe,
    dispatch,
  };
}
