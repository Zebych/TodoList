import React from 'react';
// import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {ComponentMeta} from "@storybook/";
import {ComponentStory} from "@storybook/react/dist/ts3.9/client";

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
    addItem:action('AddItemForm Cklicked')
}
