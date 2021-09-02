import {TasksStateType} from '../../app/App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsACType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.id]: [action.task, ...state[action.task.id]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

//action
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
        })
}

export const removeTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, id)
        .then((res) => {
            dispatch(removeTaskAC(id, todolistId))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTask(todolistId, title).then((res) => {
        dispatch(addTaskAC(res.data.data.item))
    })
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const allTasks = state.tasks
        const tasksForClickedTodo = allTasks[todolistId]
        const currentTask = tasksForClickedTodo.find((task) => {
            return task.id === taskId
        })
        if (currentTask) {
            let model: UpdateTaskModelType = {
                title: currentTask.title,
                status: status,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline,
            }
            todolistsAPI.updateTask(todolistId, taskId, model).then((res) => {
                    dispatch(changeTaskStatusAC(taskId, status, todolistId))
                }
            )
        }

    }
//types
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsACType
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>