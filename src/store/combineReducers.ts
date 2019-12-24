import { Reducer, Action } from './index';

export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>;
};

export interface AnyAction extends Action {
  [extraProps: string]: any;
}

export type StateFromReducersMapObject<M> = M extends ReducersMapObject<
  any,
  any
>
  ? { [P in keyof M]: M[P] extends Reducer<infer S, any> ? S : never }
  : never;

function combineReducers(reducers: ReducersMapObject) {
  const keys = Object.keys(reducers);

  return function combination(
    state: StateFromReducersMapObject<typeof reducers> = {},
    action: AnyAction
  ) {
    const nextState: StateFromReducersMapObject<typeof reducers> = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}

export default combineReducers;
