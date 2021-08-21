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
    // fieldsErrors:Array<string>
}

type TasksType={
    Items:Array<ItemTaskType>,
    totalCount:number,
    error: string | null,
}
type ItemTaskType={
    description: string
    title: string
    completed: boolean
    status:number
    priority: number
    startDate: number
    deadline: number
    id:string
    todoListId: string
    order:number
    addedDate:number
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

export const tasksApi = {
    getTasks(todolistId:string) {
        return instanse.get<TasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId:string,title: string) {
        return instanse.post<TasksType>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTasks(todolistId: string,taskId:string) {
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTasks( todolistId: string,taskId:string,title: string) {
        return instanse.put<ResponseType<ItemTaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
};


