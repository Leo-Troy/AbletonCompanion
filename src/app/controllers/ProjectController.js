import Const from "../main/Const"
import DatabaseUtils from "../utils/DatabaseUtils"
import FileSystemUtils from "../utils/FileSystemUtils"
import Utils from "../utils/Utils"
import Project from "../models/Project"
import LiveSetController from "./LiveSetController"
import ProjectStateController from "./ProjectStateController"

export default class ProjectController {

    static projects = []

    static initialize_from_file_system() {
        if (Const.project_path == undefined || Const.project_path == "") return
        const project_paths = FileSystemUtils.get_all_project_path(Const.project_path)
        project_paths.forEach((project_path) => {
            if (ProjectController.get_project_by_path(project_path) == null) {
                ProjectController.projects.push(new Project(project_path, Utils.create_id(), null, [], null, ProjectStateController.get_just_started_id()))
            }
        })
    }

    static initialize_from_database() {
        const database_projects = DatabaseUtils.get_projects()
        database_projects.forEach((project) => {
            if (ProjectController.get_project_by_path(project["path"]) == null) {
                ProjectController.projects.push(new Project(project["path"], project["id"], project["album_id"], project["tags_id"], project["main_live_set_id"], project["project_state_id"]))
            }
        })
    }

    static get_projects_of_tags(tags, no_tags, states) {
        let projects = []
        ProjectController.projects.forEach((project) => {
            let verif = false
            let verif2 = false
            tags.forEach((tag) => {
                if (project.tags_id.includes(tag.id)) verif = true
            })
            if (no_tags && project.tags_id.length == 0) verif = true

            states.forEach((state) => {
                if (project.project_state_id == state.id) verif2 = true
            })

            if (verif && verif2) projects.push(project)
        })
        return projects
    }

    static filtered_projects(params) {
        let projects = this.get_projects_of_tags(params.tags, params.no_tags, params.project_states)

        projects = projects.filter((project) => project.get_name().toUpperCase().replace(" ", "").includes(params.search_text.toUpperCase().replace(" ", "")))
        projects = projects.filter((project) => project.get_main_live_set().bpm >= params.min_bpm && project.get_main_live_set().bpm <= params.max_bpm)
        projects = projects.filter((project) => project.get_main_live_set().get_duration_seconds() >= params.min_duration && project.get_main_live_set().get_duration_seconds() <= params.max_duration)
        
        if (params.sort_creation_date) projects = projects.sort((a, b) => a.get_main_live_set().get_creation_date() - b.get_main_live_set().get_creation_date())
        if (params.sort_last_modified) projects = projects.sort((a, b) => a.get_main_live_set().get_last_modified() - b.get_main_live_set().get_last_modified())
        if (params.sort_bpm)           projects = projects.sort((a, b) => a.get_main_live_set().bpm - b.get_main_live_set().bpm)
        if (params.sort_duration)      projects = projects.sort((a, b) => a.get_main_live_set().get_duration_seconds() - b.get_main_live_set().get_duration_seconds())
        

        if (!params.ascending) projects.reverse()
        return projects
    }

    static get_project_by_path(path) {
        return ProjectController.projects.find(project => project.path == path) 
    }

    static save() {
        DatabaseUtils.save_projects(ProjectController.projects)
    }

    static remove_project_state(project_state) {
        ProjectController.projects.forEach((project) => {
            if (project_state.id == project.project_state_id) project.project_state_id = ProjectStateController.project_states[0]
        })
    }

    static automaticaly_set_tags() {
        ProjectController.projects.forEach((project) => {
            project.automaticaly_set_tags()
        })
    }
}  