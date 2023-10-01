# mini-redux

redux-core 核心包基础功能的极简实现，虽然用了 ts 但实际上类型并没有完全标注。

redux 核心库在实现上非常的简洁，没有经过太多抽象包装，核心代码量很少，关注点在于状态管理的思想（所以核心包使用起来需要写很多模板代码）。当然 redux toolkit 进行了更多的封装，使用起来更加方便。

redux 状态更新的方式和 useReducer 很相通，并且都遵循了不可变数据的思想。

中心化的 store 统一管理 state，通过给 reducer 传入不同的 action 来进行不同 type 的 state 更新，这个过程称为 dispatch，同时可以执行监听 state 变化的 effect。

感觉核心在于 reducer 这个思想，根据 action 对象分发修改，使得状态更新。

## 中间件

中间件的概念，感觉其实就是在 dispatch 前后的时机增加一些功能和操作，实现的关键在于中间件的嵌套执行和经过加强的 dispatch 如何在多个中间件之间传递。

## 合并 reducer

将多个 reducer 合并成一个 reducer，内部用键值对对象来区分不同的 state 和子 reducer
