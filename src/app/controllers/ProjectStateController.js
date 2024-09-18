import ProjectState from "../models/ProjectState"
import DatabaseUtils from "../utils/DatabaseUtils"
import Utils from "../utils/Utils"
import ColorController from "./ColorController"
import ProjectController from "./ProjectController"


export default class ProjectStateController {

    static project_states = []

    static initialize_from_database() {
        const database_project_states = DatabaseUtils.get_project_states()
        database_project_states.forEach((project_state) => {
            ProjectStateController.project_states.push(new ProjectState(project_state["name"], project_state["color"], project_state["id"]))
        })
        if (this.project_states.length == 0) {
            this.create("Just Started", "#000000") 
            this.create("Main Parts Done", "rgb(240, 195, 0)") 
            this.create("Arrangement Finished", "rgb(223, 109, 20)") 
            this.create("Mix Finished", "rgb(34, 120, 15)") 
            this.create("Finished", "rgb(121, 28, 248)") 
        }
    }

    static save() {
        DatabaseUtils.save_project_states(ProjectStateController.project_states)
    }

    static create(name, color) {
        ProjectStateController.project_states.push(new ProjectState(name, color, Utils.create_id()))
    }

    static get_just_started_id() {
        return ProjectStateController.project_states[0].id
    }

    static get_by_id(id) {
        return ProjectStateController.project_states.find(project_state => project_state.id == id) || this.get_by_id(this.get_just_started_id())
    }
    
    static create_empty() {
        ProjectStateController.project_states.push(new ProjectState("", ColorController.colors[0], Utils.create_id()))
    }

    static remove_project_state(r_project_state) {
        ProjectStateController.project_states = ProjectStateController.project_states.filter((project_state) => project_state.id != r_project_state.id)
        ProjectController.remove_project_state(r_project_state)
    }
}  