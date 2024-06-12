/** @odoo-module **/ 

import { Component, useState } from "@odoo/owl";
import { useAutofocus } from "@awesome_owl/utils/utils";
import { TodoItem } from "@awesome_owl/todo/todo_item/todo_item";

export class TodoList extends Component {
    static template = "awesome_owl.todo_list"
    static components = { TodoItem }

    setup() {
        this.todos = useState([])
        this.counter = 1
        useAutofocus("input_ref")
    }

    addTodo(ev) {
        if (ev.keyCode == 13 && ev.target.value) {
            this.todos.push({
                id: this.counter++, description: ev.target.value, isCompleted: false
            })
            ev.target.value = ""
        }
    }

    toggleState(todo) {
        todo.isCompleted = !todo.isCompleted
    }

    removeTodo(index) {
        if (index >= 0) {
            this.todos.splice(index, 1)
        } 
    }
}
