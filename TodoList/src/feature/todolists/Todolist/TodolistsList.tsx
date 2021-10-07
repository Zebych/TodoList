import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    addTodolistTC,
    fetchTodolistsThunk,
    FilterValuesType,
    TodolistDomainType, deleteTodolistTC
} from "../../../features/todolists/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskStatusTC} from "../../../features/todolists/tasks-reducer";
import {TaskStatuses} from "../../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {Todolist} from "../../../features/todolists/Todolist/Todolist";
import {TasksStateType} from "../../../app/App";
import {Redirect} from "react-router-dom";

export const TodolistsList: React.FC = (props) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsThunk())
    }, [])


    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(todolistId, id))
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId, title))
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskStatusTC(todolistId, id, status))
    }, []);
    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(deleteTodolistTC(id))
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, []);

    const addTodolist = useCallback(function (title: string) {
        dispatch(addTodolistTC(title))
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Redirect to={'login'}/>
    }
    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                entityStatus={tl.entityStatus}
                                id={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}