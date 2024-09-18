import ProjectController from "../controllers/ProjectController"
import * as fs from 'fs';


export default class Album {

    constructor(name, id, image, description) {
        this.name = name
        this.id = id
        this.image = image
        this.description = description
    }

    to_json() {
        return {
            "name": this.name,
            "id": this.id,
            "image": this.image,
            "description": this.description,
        }
    }

    image_is_valid() {
        return fs.existsSync(this.image)
    }

    get_all_projects() {
        return ProjectController.projects.filter((project) => project.album_id == this.id)
    }

    get_duration() {
        let duration = 0
        this.get_all_projects().map((project) => project.get_main_live_set().duration).forEach((time_string) => {
            const minute = parseInt(time_string.split(':')[0])
            const second = parseInt(time_string.split(':')[1])
            duration += minute * 60 + second
        })

        const hour = Math.floor(duration / 3600)
        duration -= hour * 3600
        const minute = Math.floor(duration / 60)
        duration -= minute * 60
        const second = duration

        const nice_string = (n) => {
            return n >= 10 ? n.toString() : "0" + n.toString()
        }

        return nice_string(hour) + ':' + nice_string(minute) + ':' + nice_string(second)
    }
}