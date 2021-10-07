import {tasksReducer} from '../features/todolists/tasks-reducer';
import {todolistsReducer} from '../features/todolists/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {appReducer} from './app-reducer';
import {authReducer} from "../features/login/ayth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
