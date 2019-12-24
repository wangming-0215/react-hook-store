import React, { useContext, useReducer } from 'react';

export interface Action {
  type: string;
  [propName: string]: any;
}

export interface AnyAction extends Action {
  [extraProps: string]: any;
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export interface Context<T> {
  state: T;
  dispatch: (action: Action) => void;
}

const StoreContext = React.createContext<Context<any>>({
  state: {},
  dispatch: () => {}
});

interface StoreProviderProps<TState> {
  state?: TState;
  reducer: Reducer<TState, Action>;
  children: React.ReactNode;
}

function StoreProvider<TState>(
  props: StoreProviderProps<TState>
): React.ReactElement {
  const { state: initialState = {}, reducer } = props;
  const [state, dispatch] = useReducer(reducer, initialState, () =>
    reducer(initialState as TState, { type: '@store/init' })
  );

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;

export const useStore = () => useContext(StoreContext);

export interface Selector<TAppState, TSelectedState> {
  (state: TAppState): TSelectedState;
}

export const useSelector = <TAppState, TSelectedState>(
  selector: Selector<TAppState, TSelectedState>
): TSelectedState => {
  const { state } = useStore();
  return selector(state);
};

export const useDispatch = () => {
  const { dispatch } = useStore();
  return dispatch;
};

export { default as combineReducers } from './combineReducers';
