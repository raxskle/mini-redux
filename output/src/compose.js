"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 将中间件函数数组 改为 从右向左的嵌套
// 每一个中间件可以拿到上一个中间件应用之后的dispatch
function compose(...fns) {
    return fns.reduceRight((a, b) => {
        return (...args) => b(a(...args));
    });
}
exports.default = compose;
