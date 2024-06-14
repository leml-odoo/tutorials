/** @odoo-module **/ 

import { Component } from "@odoo/owl";
import { PieChart} from "@awesome_dashboard/dashboard/pie_chart/pie_chart";

export class PieChartCard extends Component {
    static template = "awesome_dashboard.pie_chart_card"
    static components = { PieChart }
    static props = {
        title: String,
        values: Object
    }
}
