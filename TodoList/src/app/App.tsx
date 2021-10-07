import React, {useEffect} from 'react'
import './App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress'
import {Menu} from '@material-ui/icons';
import {TaskType} from '../api/todolists-api'
import {TodolistsList} from "../feature/todolists/Todolist/TodolistsList";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../features/login/Login";
import {logoutTC} from "../features/login/ayth-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    {status === 'loading' && <LinearProgress/>}
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Logout</Button>}
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Switch>
                        <Route exact path={'/'} render={() => <TodolistsList/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={'/404'}
                               render={() => <h1 style={{fontSize: '50px', textAlign: 'center'}}>404: PAGE NOT
                                   FOUND</h1>}/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </Container>
                <ErrorSnackbar/>
            </div>
        </BrowserRouter>
    );
}


export default App;
