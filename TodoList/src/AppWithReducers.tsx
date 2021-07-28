import React, {useReducer, useState} from 'react';
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

function AppWithReducers() {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, dispatchTodoListsReducer] = useReducer(todoListsReducer,[
        {id: todoListId1, title: "Want ", filter: "active"},
        {id: todoListId2, title: "Want to", filter: "active"},
    ])
    let [allTasks, dispatchAllTasksReducer] = useReducer(tasksReducer,{
            [todoListId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todoListId2]: [
                {id: v1(), title: "Book", isDone: true},
                {id: v1(), title: "milk", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
    )

    function removeTask(id: string, todoListId: string) {
        dispatchAllTasksReducer(removeTaskAC(id,todoListId))
    }
    function addTask(title: string, todoListId: string) {
        dispatchAllTasksReducer(addTaskAC(title,todoListId))
    }
    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchAllTasksReducer(changeTaskStatusAC(taskId,isDone,todoListId))
    }
    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        dispatchAllTasksReducer(changeTaskTitleAC(taskId,newTitle,todoListId))
    }



    function changeFilter(value: FilterValuesType, id: string) {
        dispatchTodoListsReducer(changeTodolistFilterAC(value,id))
    }
    const removeTodoList = (todolistId: string) => {
        dispatchTodoListsReducer(removeTodolistAC(todolistId))
    }
    const changeTodoListTitle = (todolistId: string, newTitle: string) => {
        dispatchTodoListsReducer(changeTodolistTitleAC(todolistId,newTitle))
    }
    const addTodoList = (title: string) => {
        const action=addTodolistAC(title)
        dispatchTodoListsReducer(action)
        dispatchAllTasksReducer(action)
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

export default AppWithReducers;
