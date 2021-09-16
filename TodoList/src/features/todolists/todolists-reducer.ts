import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorACType,
    setAppStatusAC,
    SetAppStatusACType
} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'CHANGE_TODOLIST_ENTITY_STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case "CLEAR_DATA":
            return []
        default:
            return state;
    }
}

//action
export const changeTodoEntityStatusAC = (entityStatus: RequestStatusType, id: string) =>
    ({type: 'CHANGE_TODOLIST_ENTITY_STATUS', entityStatus, id} as const)
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)
export const clearTodosDataAC = () => ({type: 'CLEAR_DATA'} as const)
//thunks
export const fetchTodolistsThunk = () => (dispatch: any) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists().then((res) => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
        return res.data
    })
        .then((todos) => {
            todos.forEach((tl) => {
                dispatch(fetchTasksTC(tl.id))
            })
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(addTodolistAC(res.data.data.item))
        } else {
            handleServerAppError(dispatch, res.data)
        }
        /*  dispatch(setAppStatusAC('succeeded'))
          res.data.resultCode === 0 ? dispatch(addTodolistAC(res.data.data.item))
              :handleServerNetworkError(dispatch,res.data.messages[0])
              // : dispatch(setAppErrorAC(res.data.messages[0])) && dispatch(setAppStatusAC('failed'))*/
    })
        .catch((err) => handleServerNetworkError(dispatch, err.message))
}
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoEntityStatusAC('loading', id))
    todolistsAPI.deleteTodolist(id).then((res) => {
        dispatch(setAppStatusAC('succeeded'))
        res.data.resultCode === 0 ? dispatch(removeTodolistAC(id))
            : dispatch(setAppErrorAC(res.data.messages[0])) && dispatch(setAppStatusAC('failed'))

    })
        .catch((err) => handleServerNetworkError(dispatch, err.message))
}

//types
export type ClearDataActionType = ReturnType<typeof clearTodosDataAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type ChangeTodoEntityStatusType = ReturnType<typeof changeTodoEntityStatusAC>
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ActionsType =
    | ChangeTodoEntityStatusType
    | SetAppErrorACType
    | RemoveTodolistActionType
    | SetTodolistsACType
    | AddTodolistActionType
    | SetAppStatusACType
    | ClearDataActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>




