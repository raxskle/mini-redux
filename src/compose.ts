// 将中间件函数数组 改为 从右向左的嵌套
// 每一个中间件可以拿到上一个中间件应用之后的dispatch
export default function compose(...fns: any[]) {
  return fns.reduceRight((a, b) => {
    return (...args: any) => b(a(...args));
  });
}
