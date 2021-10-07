import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    value: string
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
});
