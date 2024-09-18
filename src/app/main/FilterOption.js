import ProjectStateController from "../controllers/ProjectStateController";
import TagController from "../controllers/TagController";


export default class FilterOption {

    static View = { 
        ALL: 1,
        ALBUMS: 2,
        PROJECT: 3,
        SETTINGS: 4,
        CREDENTIALS: 5,
        LICENSE: 6
    }

    constructor() {
        this.current_view = 4
        this.current_project = null
        this.sort_creation_date = false;
        this.sort_last_modified = true;
        this.sort_bpm = false;
        this.sort_duration = false;
        this.ascending = false;
        this.min_bpm = 0;
        this.max_bpm = 200;
        this.min_duration = 0;
        this.max_duration = 600
        this.tags = TagController.tags
        this.project_states = ProjectStateController.project_states
        this.no_tags = true
        this.search_text = ""
    }

    sort_by_creation_date() {
        this.sort_creation_date = true;
        this.sort_last_modified = false;
        this.sort_bpm = false;
        this.sort_duration = false;
    }

    sort_by_last_modified() {
        this.sort_creation_date = false;
        this.sort_last_modified = true;
        this.sort_bpm = false;
        this.sort_duration = false;
    }

    sort_by_bpm() {
        this.sort_creation_date = false;
        this.sort_last_modified = false;
        this.sort_bpm = true;
        this.sort_duration = false;
    }

    sort_by_duration() {
        this.sort_creation_date = false;
        this.sort_last_modified = false;
        this.sort_bpm = false;
        this.sort_duration = true;
    }
}

/*
    Filter: bpm duration tag
*/