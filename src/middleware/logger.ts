// 中间件 第一层函数执行：接收APIs作为参数，并返回函数用于传递给compose
// compose之后再执行一次返回 应用中间件后的dispatch，返回最终的函数在组件dispatch时调用
export default function logger({ getState, dispatch }) {
  return (next) => (action) => {
    // next 就是应用上一个中间件之后的dispatch
    const prevState = getState();

    console.log(`${action.type} 执行`);
    console.log("prev state", prevState);

    // 执行dispatch
    const returnVal = next(action);

    const nextState = getState();

    console.log("next state", nextState);

    return returnVal; // 作为下一个中间件的next参数
  };
}
