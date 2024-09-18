import Vst from "../models/Vst"
import DatabaseUtils from "../utils/DatabaseUtils"
import Utils from "../utils/Utils"


export default class VstController {

    static vsts = []

    static initialize_from_database() {
        const database_vsts = DatabaseUtils.get_vsts()
        database_vsts.forEach((vst) => {
            VstController.vsts.push(new Vst(vst["path"], vst["id"]))
        })
    }

    static get_by_id(id) {
        return this.vsts.find((vst) => vst.id == id)
    }

    static get_by_path(path) {
        return this.vsts.find((vst) => vst.path == path)
    }

    static get_or_create_by_path(path) {
        let vst = this.get_by_path(path)
        if (vst == null) {
            vst = new Vst(path, Utils.create_id())
            VstController.vsts.push(vst)
        }
        return vst
    }

    static save() {
        DatabaseUtils.save_vsts(VstController.vsts)
    }
}  