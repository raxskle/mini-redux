export interface Dispatch<A extends AnyAction> {
  (params: A): void;
}

// action对象必须包含type属性
export interface Action<T = any> {
  type: T;
}

// 包含type属性，其余属性任意
export interface AnyAction<T = any> extends Action<T> {
  [extraProps: string]: any;
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export interface Store<T extends any, A extends AnyAction> {
  getState: () => T | undefined;
  subscribe: (fn: () => void) => () => void;
  dispatch: Dispatch<A>;
}
