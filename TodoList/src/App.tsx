import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    function removeTask(id: string, todoListId: string) {
        let tasks = allTasks[todoListId]
        let filteredTasks = tasks.filter(t => t.id != id);
        allTasks[todoListId] = filteredTasks
        setAllTasks({...allTasks});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = allTasks[todoListId]
        allTasks[todoListId] = [task, ...tasks];
        setAllTasks({...allTasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = allTasks[todoListId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setAllTasks({...allTasks});
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let tasks = allTasks[todoListId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
        }

        setAllTasks({...allTasks});
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find((t) => t.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
        /*setFilter(value);*/
    }

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: "Want ", filter: "active"},
        {id: todoListId2, title: "Want to", filter: "active"},
    ])
    let [allTasks, setAllTasks] = useState<TasksStateType>({
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
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete allTasks[todoListID]
    }
    const changeTodoListTitle = (id: string, newTitle: string) => {
        const todolist = todoLists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodoLists([...todoLists])
        }
    }
    const addTodoList = (title: string) => {
        let todoList: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }

        setTodoLists([todoList, ...todoLists])
        setAllTasks({...allTasks, [todoList.id]: []})
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tl) => {
                    let tasksForTodolist = allTasks[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
                    return (

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
                        />)
                })
            }

        </div>
    );
}

export default App;
