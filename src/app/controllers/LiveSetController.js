import Const from "../main/Const"
import LiveSet from "../models/LiveSet"
import DatabaseUtils from "../utils/DatabaseUtils"
import FileSystemUtils from "../utils/FileSystemUtils"
import Utils from "../utils/Utils"
import ProjectController from "./ProjectController"

export default class LiveSetController {

    static live_sets = []

    static initialize_from_file_system() {
        if (Const.project_path == undefined || Const.project_path == "") return
        ProjectController.projects.forEach((project) => {
            const live_set_paths = FileSystemUtils.get_all_live_set_path_in_project(project.path)
            live_set_paths.forEach((live_set_path) => {
                if (LiveSetController.get_live_set_by_path(live_set_path) == null) {
                    LiveSetController.live_sets.push(new LiveSet(live_set_path, Utils.create_id(), project.id, null, null, null, null, null, null))
                }
            })
        })
    } 

    static initialize_from_database() {
        const database_live_sets = DatabaseUtils.get_live_sets()
        database_live_sets.forEach((live_set) => {
            if (LiveSetController.get_live_set_by_path(live_set["path"]) == null) {
                LiveSetController.live_sets.push(new LiveSet(live_set["path"], live_set["id"], live_set["project_id"], live_set["bpm"], live_set["duration"], live_set["track_count"], live_set["samples_id"], live_set["vsts_id"], live_set["last_modified"]))
            }
        })
    }

    static get_live_set_by_path(path) {
        return LiveSetController.live_sets.find(live_set => live_set.path == path) 
    }

    static get_live_set_by_id(id) {
        return LiveSetController.live_sets.find(live_set => live_set.id == id) 
    }

    static save() {
        DatabaseUtils.save_live_sets(LiveSetController.live_sets)
    }
}  