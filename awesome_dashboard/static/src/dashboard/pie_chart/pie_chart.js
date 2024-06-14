/** @odoo-module **/ 

import { Component, onWillStart, useEffect, onWillUnmount, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { getColor, BORDER_WHITE } from "@web/core/colors/colors"; 

export class PieChart extends Component {
    static template = "awesome_owl.pie_chart"

    setup() {
        this.chart = null;
        this.canvasRef = useRef('canvas')
        onWillStart(() => loadJS(["web/static/lib/Chart/Chart.js"]))
        useEffect(() => this.renderChart())
        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy()
            }
        })
    }

    getPieChartData() {
        const data_labels = Object.keys(this.props.sizes)
        const data = Object.values(this.props.sizes)
        const colors = data_labels.map((_, index) => getColor(index))
        return {
            labels: data_labels,
            datasets: [{
                data: data,
                backGroundColor: colors
            }],
        }
    }

    getChartConfig() {
        const data = this.getPieChartData()
        return {
            type: 'pie',
            data: data,
            options: {
                onClick: (ev, element) => {
                    console.log(element)
                }
            }
        }
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy()
        }

        const config = this.getChartConfig()
        this.chart = new Chart(this.canvasRef.el, config)
    }
}
