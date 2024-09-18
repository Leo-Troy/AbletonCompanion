import DatabaseUtils from "../utils/DatabaseUtils"
import * as fs from 'fs';

export default class Const {
    // static project_path = "C:\\Users\\Red\\OneDrive\\Bureau\\SanProjects"
    // static project_path = "C:/Users/Red/OneDrive/Documents/OldPc/Ableton/Projects" 
    static project_path = ""
    static license_accepted = false

    static initialize_from_database() {
        const database_const = DatabaseUtils.get_consts()
        Const.project_path = database_const["project_path"]
        if (Const.project_path == undefined || Const.project_path == false || Const.project_path == true) Const.project_path = ""
        Const.license_accepted = database_const["license_accepted"] || false
    }

    static set_project_path(project_path) {
        if (!fs.existsSync(project_path)) return
        Const.project_path = project_path
    }

    static save() {
        DatabaseUtils.save_consts(Const.project_path, Const.license_accepted)
    }
}