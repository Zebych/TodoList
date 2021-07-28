import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;