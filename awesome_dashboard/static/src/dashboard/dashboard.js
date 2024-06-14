/** @odoo-module **/

import { Component, useState, xml } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { CheckBox } from "@web/core/checkbox/checkbox";
import { Dialog } from "@web/core/dialog/dialog";

import { DashboardItem } from "@awesome_dashboard/dashboard/dashboard_item/dashboard_item";

export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, DashboardItem }

    setup() {
        this.action = useService("action");
        this.dialog = useService('dialog')
        this.data = useState(useService('statistics')),
        this.items = registry.category('awesome_dashboard').getAll()
        this.state = useState({ disabledItems: [] })
    }

    openCustomers() {
        this.action.doAction("base.action_partner_form")
    }

    openLeads() {
        this.action.doAction({
            'type': 'ir.actions.act_window',
            'name': 'Leads',
            'target': 'current',
            'res_model': 'crm.lead',
            'views': [[false, 'tree'], [false, 'form']]
        })
    }

    updateConfiguration(newDisabledItems) {
       this.state.disabledItems = newDisabledItems
    }

    openConfigurationDialog() {
        return this.dialog.add(AwesomeDashboardConfigDialog, {
            title: "Dashboard Items Configuration",
            body: "Which cards do you wish to see?",
            items: this.items,
            disabledItems: this.state.disabledItems,
            onUpdateConfiguration: this.updateConfiguration.bind(this)
        }); 
    }
}

export class AwesomeDashboardConfigDialog extends Component {
    static template = "awesome_dashboard.config_dialog"
    static components = { Dialog, CheckBox }

    setup() {
        this.items = useState(this.props.items.map((item) => {
            return {
                ...item,
                enabled: !this.props.disabledItems.includes(item.id)
            }
        }))
    }

    onChange(checked, item) {
        item.enabled = checked
    }

    updateDisabledItems() {
        const newDisabledItems = []
        for (const item of this.items) {
            if (!item.enabled) {
                newDisabledItems.push(item.id)
            }
        }
        this.props.onUpdateConfiguration(newDisabledItems)
        this.props.close()
    }
}

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);
