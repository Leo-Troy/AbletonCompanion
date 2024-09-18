import * as fs from 'fs';
import * as path from 'path';

export default class Vst {

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

    get_name() {
        return path.basename(this.path).replace(".dll", "");
    }
}