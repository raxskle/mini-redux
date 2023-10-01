"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const index_1 = require("../src/index");
const logger_1 = __importDefault(require("../src/middleware/logger"));
const thunk_1 = __importDefault(require("../src/middleware/thunk"));
function counterReducer(state = 0, action) {
    switch (action.type) {
        case "incremented":
            return state + 1;
        case "decremented":
            return state - 1;
        default:
            return state;
    }
}
exports.store = (0, index_1.createStore)(counterReducer, (0, index_1.applyMiddleware)(logger_1.default, thunk_1.default));
console.log("store state", exports.store.getState());
exports.store.dispatch({ type: "incremented" });
console.log("new state", exports.store.getState());
// store state 0
// incremented 执行
// prev state 0
// next state 1
// new state 1
