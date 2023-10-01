import compose from "./compose";

// 中间件enhancer，创建一个应用了所有中间件的store
export default function applyMiddleware(...middlewares: any[]) {
  // 传入createStore函数，在内部调用进行创建store
  return (createStore) => (reducer, preloadedState: any) => {
    // 创建基本 store
    const store = createStore(reducer, preloadedState);
    let dispatch = store.dispatch;

    // 提供给中间件的方法APIs
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    // 给中间件传入APIs
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));

    // 包装dispatch 应用中间件
    dispatch = compose(...chain)(store.dispatch);

    // 返回应用中间件后的store
    return {
      ...store,
      dispatch,
    };
  };
}
