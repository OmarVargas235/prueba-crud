import { combineReducers } from 'redux';

import userSlice from './reducerUser';
import reducerBlockUI from './reducerBlockUI';
import alert from './reducerAlert';

const rootReducer = combineReducers({
    user: userSlice,
    blockUI: reducerBlockUI,
    alert,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;