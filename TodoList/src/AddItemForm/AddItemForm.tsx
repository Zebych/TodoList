import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {PlaylistAdd} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormType> = (props) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }

    return (
        <div>
            <TextField variant={"outlined"}
                       label={'Type value'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
            />
            <IconButton onClick={addTask} color={"primary"}>
                <PlaylistAdd/>
            </IconButton>
            {error && <div className="error-message">{error}</div>}

        </div>
    )
}