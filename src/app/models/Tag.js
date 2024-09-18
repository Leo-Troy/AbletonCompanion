import AutomationController from "../controllers/AutomationController"

export default class Tag {

    constructor(name, color, id, automation_ids) {
        this.name = name
        this.color = color
        this.id = id
        this.automation_ids = automation_ids
        if (!this.automation_ids) this.automation_ids = []
    }

    to_json() {
        return {
            "name": this.name,
            "color": this.color,
            "id": this.id,
            "automation_ids": this.automation_ids,
        }
    }

    get_automations() {
        return this.automation_ids.map((id) => AutomationController.get_by_id(id)).filter((automation) => automation != undefined)
    }

    validate_project(project) {
        if (this.get_automations().length == 0) return false
        let verif = true
        this.get_automations().forEach((automation) => {
            if (!automation.validate_project(project)) {
                verif = false
            }
        })
        return verif
    }

    remove_automation(automation) {
        this.automation_ids = this.automation_ids.filter((automation_id) => automation_id != automation.id)
    }
}