"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compose_1 = __importDefault(require("./compose"));
// 中间件enhancer，创建一个应用了所有中间件的store
function applyMiddleware(...middlewares) {
    // 传入createStore函数，在内部调用进行创建store
    return (createStore) => (reducer, preloadedState) => {
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
        dispatch = (0, compose_1.default)(...chain)(store.dispatch);
        // 返回应用中间件后的store
        return Object.assign(Object.assign({}, store), { dispatch });
    };
}
exports.default = applyMiddleware;
