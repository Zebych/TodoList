import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType

}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todoListsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find((t) => t.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const RemoveTodolistAC=(todolistId:string):RemoveTodolistActionType=>{
    return {type:'REMOVE-TODOLIST',id:todolistId}
}
export const AddTodolistAC=(todolistId:string):AddTodolistActionType=>{
    return {type:"ADD-TODOLIST",title:todolistId}
}
export const ChangeTodolistTitleAC=(todolistId:string,title:string):ChangeTodolistTitleActionType=>{
    return {type:"CHANGE-TODOLIST-TITLE",id:todolistId,title:title}
}
export const ChangeTodolistFilterAC=(todolistId:string,filter:FilterValuesType):ChangeTodolistFilterActionType=>{
    return {type:"CHANGE-TODOLIST-FILTER",id:todolistId,filter:filter}
}