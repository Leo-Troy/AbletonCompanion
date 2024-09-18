import ProjectController from "../controllers/ProjectController";
import LiveSetController from "../controllers/LiveSetController";
import AlbumController from "../controllers/AlbumController";
import TagController from "../controllers/TagController";
import SampleController from "../controllers/SampleController";
import VstController from "../controllers/VstController";
import ProjectStateController from "../controllers/ProjectStateController";
import Const from "./Const";
import XmlParser from "../utils/XmlParser";
import ColorController from "../controllers/ColorController";
import AutomationController from "../controllers/AutomationController";


export default class AbletonCompanionApp {

    static init() {
        LiveSetController.live_sets = []
        ProjectController.projects = []
        AlbumController.albums = []
        TagController.tags = []
        SampleController.samples = []
        VstController.vsts = []
        ProjectStateController.project_states = []
        ColorController.colors = []

        ColorController.init()
        Const.initialize_from_database()
        AlbumController.initialize_from_database()
        TagController.initialize_from_database()
        SampleController.initialize_from_database()
        VstController.initialize_from_database()
        ProjectStateController.initialize_from_database()
        AutomationController.initialize_from_database()

        if (ProjectStateController.project_states.length == 0) {
            ProjectStateController.create("Just Started", ColorController.colors[8])
            ProjectStateController.create("Main Parts Done", ColorController.colors[3])
            ProjectStateController.create("Arrangement Finished", ColorController.colors[2])
            ProjectStateController.create("Mix Finished", ColorController.colors[4])
            ProjectStateController.create("Finished", ColorController.colors[0])
        }

        if (TagController.tags.length == 0) {
            TagController.create("Rock", ColorController.colors[0])
            TagController.create("Electro", ColorController.colors[6])
            TagController.create("Favorite", ColorController.colors[3])
            TagController.create("Very Bad", ColorController.colors[1])
        }

        ProjectController.initialize_from_database()
        ProjectController.initialize_from_file_system()
        LiveSetController.initialize_from_database()
        LiveSetController.initialize_from_file_system()

    }

    static save() {
        Const.save()
        ProjectController.save()
        LiveSetController.save()
        AlbumController.save()
        TagController.save()
        SampleController.save()
        VstController.save()
        ProjectStateController.save()
        AutomationController.save()
    }
} 