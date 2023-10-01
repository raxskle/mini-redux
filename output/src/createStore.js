"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 创建store，包含基本的方法
function createStore(reducer, enhancer) {
    // 如果传入enhancer，那么应用enhancer来创建store
    if (enhancer) {
        return enhancer(createStore)(reducer);
    }
    let currentState;
    let currentListeners = [];
    // 得到state
    const getState = () => currentState;
    // 将effect订阅更新，使得当更新state时可以更新UI
    const subscribe = (fn) => {
        currentListeners.push(fn);
        // 返回函数可以取消订阅
        return () => {
            const index = currentListeners.findIndex(fn);
            currentListeners.splice(index, 1);
        };
    };
    // 根据action更新state，并执行effect
    const dispatch = (action) => {
        currentState = reducer(currentState, action);
        currentListeners.forEach((listener) => listener());
    };
    dispatch({ type: "init" });
    return {
        getState,
        subscribe,
        dispatch,
    };
}
exports.default = createStore;
