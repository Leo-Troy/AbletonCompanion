
export default class ProjectState {

    constructor(name, color, id) {
        this.name = name
        this.color = color
        this.id = id
    }

    to_json() {
        return {
            "name": this.name,
            "color": this.color,
            "id": this.id
        }
    }
}