import { combineReducers } from 'redux'
import AuthReducer from './auth.reducer';
import UiReducer from './ui.reducers';
import TaskReducer from './tasks.reducers';
const rootReducer =combineReducers({
    auth    :   AuthReducer,
    ui  :   UiReducer,
    tasks   :   TaskReducer

})

export default rootReducer;