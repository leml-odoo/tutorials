/** @odoo-module **/

import { Component, markup, useState } from "@odoo/owl";
import { Counter } from "@awesome_owl/counter/counter";
import { Card } from "@awesome_owl/card/card";
import { TodoList } from "@awesome_owl/todo/todo_list/todo_list";

export class Playground extends Component {
    static template = "awesome_owl.playground";
    static components = { Counter, Card, TodoList }

    setup() {
        this.htmlContentOne = "<div>Content of Card 1 no-markup</div>"
        this.htmlContentTwo = markup('<div style="color: blue;">Content of Card 2 markup</div>')
        this.state = useState({ sum: 0, current_section: 'card' })
        this.sections = {
            'counter': 'Counters',
            'card': 'Cards',
            'todo_list': 'Todo List'
        }
    }

    incrementSum() {
        this.state.sum++
    }

    changeSection(buttonValue) {
        if (this.state.current_section !== buttonValue) {
            this.state.current_section = buttonValue
        }
    }
}
