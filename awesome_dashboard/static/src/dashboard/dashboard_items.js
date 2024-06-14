/** @odoo-module **/ 

import { registry } from "@web/core/registry";

import { NumberCard } from "@awesome_dashboard/dashboard/number_card/number_card";
import { PieChartCard } from "@awesome_dashboard/dashboard/pie_chart_card/pie_chart_card";

export const items = [
    {
        id: "average_quantity",
        description: "Average number of T-shirts by Order",
        Component: NumberCard,
        props: (data) => ({
            title: "Average number of T-shirts by Order",
            value: data.average_quantity
        })
    },
    {
        id: "average_time",
        description: "Average time for an order",
        Component: NumberCard,
        props: (data) => ({
            title: "Average time (in hours) elapsed between the moment an order is created and the moment it is sent",
            value: data.nb_cancelled_orders
        })
    },
    {
        id: 'nb_cancelled_orders',
        description: "The number of cancelled orders, this month",
        Component: NumberCard,
        props: (data) => ({
            title: "The number of cancelled orders, this month",
            value: data.nb_cancelled_orders
        })
    },
    {
        id: 'nb_new_orders',
        description: 'The number of new orders, this month',
        Component: NumberCard,
        props: (data) => ({
            title: "The number of new orders, this month",
            value: data.nb_new_orders
        })
    },
    {
        id: "total_amount",
        description: "The total amount of orders, this month",
        Component: NumberCard,
        props: (data) => ({
            title: "The total amount of orders, this month",
            value: data.total_amount
        })
    },
    {
        id: 'orders_by_size',
        description: "Shirt orders by size",
        Component: PieChartCard,
        props: (data) => ({
            title: "Shirt orders by size",
            values: data.orders_by_size
        })
    }
]

items.forEach((item) => {
    registry.category('awesome_dashboard').add(item.id, item)
})
