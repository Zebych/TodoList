import React, {useReducer} from 'react';
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



    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id,todoListId))
    }
    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title,todoListId))
    }
    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId,isDone,todoListId))
    }
    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(taskId,newTitle,todoListId))
    }



    function changeFilter(value: FilterValuesType, id: string) {
        dispatch(changeTodolistFilterAC(value,id))
    }
    const removeTodoList = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeTodoListTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId,newTitle))
    }
    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
    }

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

                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                        }
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
