import { combineReducers } from '../store';

import count from './count';

const rootReducer = combineReducers({ count });

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
