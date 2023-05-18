import { combineReducers } from 'redux';

import userSlice from './reducerUser';
import reducerBlockUI from './reducerBlockUI';
import alert from './reducerAlert';
import modalUser from './openModalUser';

const rootReducer = combineReducers({
    user: userSlice,
    blockUI: reducerBlockUI,
    alert,
    modalUser,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;