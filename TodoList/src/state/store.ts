import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
//  задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer,applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
