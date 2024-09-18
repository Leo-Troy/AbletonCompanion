import VstController from "../controllers/VstController"
import Utils from "../utils/Utils"

export class Automation {

    constructor(id, type) {
        this.id = id
        this.type = type
    }

    to_json() {
        return {
            "id": this.id,
            "type": this.type,
        }
    }
}

export class VstIncludesAutomation extends Automation {

    constructor(id, vst_id, should) {
        super(id, "VstIncludesAutomation")
        this.vst_id = vst_id
        this.should = should
    }

    to_json() {
        let json = super.to_json()
        json["vst_id"] = this.vst_id
        json["should"] = this.should
        return json
    }

    get_vst() {
        return VstController.get_by_id(this.vst_id)
    }

    static create() {
        return new VstIncludesAutomation(Utils.create_id(), "", true)
    }

    validate_project(project) {
        if (this.should) return project.get_main_live_set().vsts_id.includes(this.vst_id)
        else return !project.get_main_live_set().vsts_id.includes(this.vst_id)
    }
}

export class VstCountAutomation extends Automation {

    constructor(id, count, superior) {
        super(id, "VstCountAutomation")
        this.superior = superior
        this.count = count
    }

    to_json() {
        let json = super.to_json()
        json["superior"] = this.superior
        json["count"] = this.count
        return json
    }

    static create() {
        return new VstCountAutomation(Utils.create_id(), 2, true)
    }

    validate_project(project) {
        if (this.superior) return project.get_main_live_set().vsts_id.length >= 3
        else return !project.get_main_live_set().vsts_id.length <= 3
    }
}