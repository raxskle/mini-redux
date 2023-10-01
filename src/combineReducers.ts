// 将传入的多个不同的reducers合并成一个reducer
// reducers 是 key=>reducer 键值对对象
// state 也是 key=>state 键值对区分不同reducer处理的state
export default function combineReducers(reducers) {
  // 返回新的集合 reducer
  return function (state = {}, action) {
    const nextState = {};
    let hasChanged = false;

    // 遍历每个内部的reducer，进行更新
    // 一个action可能会实际造成多个reducer的state更新
    for (let key in reducers) {
      nextState[key] = reducers[key](state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    }

    hasChanged =
      hasChanged || Object.keys(nextState).length !== Object.keys(state).length;

    // 如果没变化，那么返回原本的引用
    return hasChanged ? nextState : state;
  };
}
