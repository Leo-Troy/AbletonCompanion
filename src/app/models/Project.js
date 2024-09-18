import LiveSetController from "../controllers/LiveSetController"
import * as fs from 'fs';
import * as path from 'path';
import TagController from "../controllers/TagController";
import AlbumController from "../controllers/AlbumController";
import ProjectStateController from "../controllers/ProjectStateController";

export default class Project {

    constructor(path, id, album_id, tags_id, main_live_set_id, project_state_id) {
        this.path = path
        this.id = id
        this.album_id = album_id
        this.tags_id = tags_id
        this.main_live_set_id = main_live_set_id;
        this.project_state_id = project_state_id;
    }

    to_json() {
        return {
            "path": this.path,
            "id": this.id,
            "album_id": this.album_id,
            "tags_id": this.tags_id,
            "main_live_set_id": this.main_live_set_id,
            "project_state_id": this.project_state_id,
        }
    }

    get_name() {
        return path.basename(this.path).slice(0, -8);
    }

    get_album() {
        if (this.album_id == null) return null
        return AlbumController.get_by_id(this.album_id)
    }


    get_live_sets() {
        return LiveSetController.live_sets.filter((live_set) => live_set.project_id == this.id)
    }

    get_live_sets_first_main() {
        let live_sets = LiveSetController.live_sets.filter((live_set) => live_set.project_id == this.id)
            .sort((a, b) => b.get_last_modified() - a.get_last_modified())
        const index = live_sets.indexOf(this.get_main_live_set());
        live_sets.splice(index, 1);
        live_sets.unshift(this.get_main_live_set());
        return live_sets
    }

    get_main_live_set() {
        if (this.main_live_set_id != null) return LiveSetController.get_live_set_by_id(this.main_live_set_id)
        const live_sets = this.get_live_sets()
        return live_sets.reduce((max, obj) => (obj.get_last_modified() > max.get_last_modified() ? obj : max), live_sets[0]);
    }

    get_tags() {
        return TagController.tags.filter((tag) => this.tags_id.includes(tag.id))
    }

    get_other_tags() {
        return TagController.tags.filter((tag) => !this.tags_id.includes(tag.id))
    }

    get_state() {
        return ProjectStateController.get_by_id(this.project_state_id)
    }

    remove_tag(r_tag) {
        this.tags_id = this.tags_id.filter((tag_id) => tag_id != r_tag.id)
    }

    automaticaly_set_tags() {
        TagController.tags.forEach((tag) => {
            if (tag.validate_project(this) == true) {
                if (!this.tags_id.includes(tag.id)) {
                    this.tags_id.push(tag.id)
                }
            } else {
                this.remove_tag(tag)
            }
        })
    }

    
}


