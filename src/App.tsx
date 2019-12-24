import React from 'react';

import { useSelector, useDispatch } from './store';
import { AppState } from './reducers';
import { CountState } from './reducers/count';
import { increment } from './actions/count';

const App: React.FC = () => {
  const state = useSelector<AppState, CountState>(state => state.count);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <p>{state.count}</p>
      <button onClick={() => dispatch(increment(2))}>+</button>
    </div>
  );
};

export default App;
