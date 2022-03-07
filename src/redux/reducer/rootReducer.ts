import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { calendarReducer } from './calendarReducer';
import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer

})

export type State = ReturnType<typeof rootReducer>
// export type AppDispatch = typeof rootReducer.dispatch

