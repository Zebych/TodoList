import React, {useCallback, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function MenuIcon() {
    return null;
}

function AppWithRedux() {

    const dispatch=useDispatch()
    const todoLists=useSelector<AppRootState,Array<TodolistType>>(state=>state.todoLists)
    const allTasks=useSelector<AppRootState,TasksStateType>(state=>state.tasks)



    const removeTask=useCallback((id: string, todoListId: string)=> {
        dispatch(removeTaskAC(id,todoListId))
    },[dispatch])
    const addTask=useCallback((title: string, todoListId: string)=>{
        dispatch(addTaskAC(title,todoListId))
    },[dispatch])
    const changeStatus=useCallback((taskId: string, isDone: boolean, todoListId: string)=> {
        dispatch(changeTaskStatusAC(taskId,isDone,todoListId))
    },[dispatch])
    const changeTaskTitle=useCallback((taskId: string, newTitle: string, todoListId: string)=> {
        dispatch(changeTaskTitleAC(taskId,newTitle,todoListId))
    },[dispatch])



    const changeFilter=useCallback((value: FilterValuesType, id: string)=> {
        dispatch(changeTodolistFilterAC(value,id))
    },[dispatch])
    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    },[dispatch])
    const changeTodoListTitle =useCallback( (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId,newTitle))
    },[dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {
                        let tasksForTodolist = allTasks[tl.id];


                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
