import * as fs from 'fs';

export default class Sample {

    constructor(path, id) {
        this.path = path
        this.id = id
    }

    to_json() {
        return {
            "path": this.path,
            "id": this.id,
        }
    }

    is_valid() {
        return fs.existsSync(this.path)
    }
}