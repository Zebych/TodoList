import React, {useEffect, useState} from 'react'
import {tasksApi} from "../api/todolists-api";

export default {
    title: 'TodoList/Tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '4770c8a4-b253-4d2d-8013-8d46c5fca7ac'
        tasksApi.getTasks(todolistId)
            .then((res) => {
                debugger
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '4770c8a4-b253-4d2d-8013-8d46c5fca7ac'
        let title = 'Sasha'
        tasksApi.createTasks(todolistId,title)
            .then((res) => {
                debugger
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '4770c8a4-b253-4d2d-8013-8d46c5fca7ac'
        let taskId = 'bc6efe75-9486-4861-b66d-a3cfeef03ef1'
        tasksApi.deleteTasks(todolistId,taskId)
            .then((res) => {
                debugger
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'Dasha'
        let taskId = '6ba56c48-1b6f-4aa5-b7bd-b4c825cd19a6'
        let todolistId = '4770c8a4-b253-4d2d-8013-8d46c5fca7ac'

        tasksApi.updateTasks(todolistId,taskId,title)
            .then((res) => {
                setState(res.data.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

