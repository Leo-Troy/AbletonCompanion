import * as fs from 'fs';
const { remote } = require('electron');

let path_database = remote.app.getPath('documents') + "/AbletonCompanionDatabase/"
let project_database = path_database + "projects.json"
let live_set_database = path_database + "live_sets.json"
let album_database = path_database + "albums.json"
let tag_database = path_database + "tags.json"
let sample_database = path_database + "samples.json"
let vst_database = path_database + "vsts.json"
let project_state_database = path_database + "project_states.json"
let const_database = path_database + "consts.json"
let automation_database = path_database + "automations.json"


export default class DatabaseUtils {
    
    static get(database) {
        if (!fs.existsSync(path_database)) {
            fs.mkdirSync(path_database); 
        }
        if (!fs.existsSync(database)) {
            fs.writeFileSync(database, '[]');
        }
        let json = fs.readFileSync(database);
        return JSON.parse(json);
    }

    static save(database, objects) {
        if (!fs.existsSync(path_database)) {
            fs.mkdirSync(path_database); 
        }
        const json = objects.filter(object => object.to_json())
        const json_string = JSON.stringify(json);
        fs.writeFileSync(database, json_string);
    }

    static get_projects() {
        return this.get(project_database)
    }
    static save_projects(projects) {
        this.save(project_database, projects)
    }

    static get_live_sets() {
        return this.get(live_set_database)
    }
    static save_live_sets(live_sets) {
        this.save(live_set_database, live_sets)
    }

    static get_albums() {
        return this.get(album_database)
    }
    static save_albums(albums) {
        this.save(album_database, albums)
    }

    static get_tags() {
        return this.get(tag_database)
    }
    static save_tags(tags) {
        this.save(tag_database, tags)
    }

    static get_samples() {
        return this.get(sample_database)
    }
    static save_samples(samples) {
        this.save(sample_database, samples)
    }

    static get_vsts() {
        return this.get(vst_database)
    }
    static save_vsts(vsts) {
        this.save(vst_database, vsts)
    }

    static get_project_states() {
        return this.get(project_state_database)
    }
    static save_project_states(project_states) {
        this.save(project_state_database, project_states)
    }

    static get_automations() {
        return this.get(automation_database)
    }
    static save_automations(automations) {
        this.save(automation_database, automations)
    }

    static get_consts() {
        if (!fs.existsSync(path_database)) {
            fs.mkdirSync(path_database); 
        }
        if (!fs.existsSync(const_database)) {
            fs.writeFileSync(const_database, '{}');
        }
        let json = fs.readFileSync(const_database);
        return JSON.parse(json);
    }
    static save_consts(const_project_path, license_accepted) {
        if (!fs.existsSync(path_database)) {
            fs.mkdirSync(path_database); 
        }
        if (const_project_path == false || const_project_path == true) const_project_path = ""
        const json = {
            "project_path": const_project_path,
            "license_accepted": license_accepted
        }
        const json_string = JSON.stringify(json);
        fs.writeFileSync(const_database, json_string);
    }

} 