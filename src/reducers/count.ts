import { Reducer } from '../store';
import { ActionTypes, Actions } from '../actions/count';

export interface CountState {
  count: number;
}

const initialState: CountState = {
  count: 0
};

const reducer: Reducer<CountState, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.INCREMENT: {
      return { ...state, count: state.count + action.count };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
