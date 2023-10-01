export default function thunk({ getState, dispatch }) {
  return (next) => (action) => {
    // 当action传入函数时进行执行
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    // 否则直接dispatch 继续传递
    return next(action);
  };
}
