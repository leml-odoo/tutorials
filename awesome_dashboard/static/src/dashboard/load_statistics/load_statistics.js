/** @odoo-module **/ 

import { reactive } from "@odoo/owl";
import { registry } from "@web/core/registry";

export const statisticsService = {
    dependencies: ['rpc'],
    async start(env, { rpc }) {

        const statistics = reactive(await rpc("awesome_dashboard/statistics"))
        this.intervalId = setInterval(async () => {
            Object.assign(statistics, await rpc("awesome_dashboard/statistics"))
        }, 60000 * 10)

        return statistics
    }
}

registry.category('services').add('statistics', statisticsService)
