import { VstIncludesAutomation, VstCountAutomation }  from "../models/Automation"
import DatabaseUtils from "../utils/DatabaseUtils"


export default class AutomationController {

    static automations = []

    static initialize_from_database() {
        const database_automations = DatabaseUtils.get_automations()
        database_automations.forEach((automation) => {
            if (automation["type"] == "VstIncludesAutomation")
                AutomationController.automations.push(new VstIncludesAutomation(automation["id"], automation["vst_id"], automation["should"]))
            if (automation["type"] == "VstCountAutomation")
                AutomationController.automations.push(new VstCountAutomation(automation["id"], automation["count"], automation["superior"]))
        })
    }

    static get_by_id(id) {
        return this.automations.find((automation) => automation.id == id)
    }

    static save() {
        DatabaseUtils.save_automations(AutomationController.automations)
    }

    static remove_automation(r_automation) {
        AutomationController.automations = AutomationController.automations.filter((automation) => automation.id != r_automation.id)
    }

    static create(type) {
        let automation = null
        if (type == "VstIncludesAutomation") {
            automation = VstIncludesAutomation.create()
        }
        if (type == "VstCountAutomation") {
            automation = VstCountAutomation.create()
        }
        if (automation != null) AutomationController.automations.push(automation)
        return automation
    }
}  