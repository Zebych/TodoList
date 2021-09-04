import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsActionType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsActionType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('неизвестная ошибка'))
    }
    dispatch(setAppStatusAC('failed'))
}

//types
type ErrorUtilsActionType = | SetAppErrorACType | SetAppStatusACType