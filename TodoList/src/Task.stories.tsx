import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: 'TodoList/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback=action('Status changed inside Task')
const changeTaskTitleCallback=action('Title changed inside Task')
const removeTaskCallback=action('Remove Button  inside Task clicked')
const baseArgs=  {
        changeTaskStatus:changeTaskStatusCallback,
        changeTaskTitle:changeTaskTitleCallback,
        removeTask:removeTaskCallback
    }

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id:'1',isDone:true,title:'JS'},
    todolistId:'todolistID1'
}
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id:'1',isDone:true,title:'JS'},
    todolistId:'todolistID1'
}
