import axios from "axios";

type TodolistsType={
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<T={}>={
    data: T
    resultCode: number
    messages:Array<string>
    fieldsErrors:Array<string>
}


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'aaa63ed6-139f-4a73-aa64-3185c5225bcd'
    }
}
const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todolistsApi = {
    getTodolists() {
        return instanse.get<Array<TodolistsType>>('todo-lists')
    },
    createTodo(title: string) {
        return instanse.post<ResponseType<{ item:TodolistsType}>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodo(title: string, todolistId: string) {
        return instanse.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
};

