import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId:string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId: string,
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
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST': {
            return [{id:action.todolistId, title: action.title, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.todolistId)
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

export const removeTodolistAC=(todolistId:string):RemoveTodolistActionType=>{
    return {type:'REMOVE-TODOLIST',todolistId:todolistId}
}
export const addTodolistAC=(title:string):AddTodolistActionType=>{
    return {type:"ADD-TODOLIST",title:title,todolistId:v1()}
}
export const changeTodolistTitleAC=(todolistId:string, title:string):ChangeTodolistTitleActionType=>{
    return {type:"CHANGE-TODOLIST-TITLE",todolistId:todolistId,title:title}
}
export const changeTodolistFilterAC=(filter:FilterValuesType, todolistId:string):ChangeTodolistFilterActionType=>{
    return {type:"CHANGE-TODOLIST-FILTER",id:todolistId,filter:filter}
}