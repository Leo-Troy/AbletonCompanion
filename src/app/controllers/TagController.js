import Tag from "../models/Tag"
import DatabaseUtils from "../utils/DatabaseUtils"
import Utils from "../utils/Utils"
import ColorController from "./ColorController"


export default class TagController {

    static tags = []

    static initialize_from_database() {
        const database_tags = DatabaseUtils.get_tags()
        database_tags.forEach((tag) => {
            TagController.tags.push(new Tag(tag["name"], tag["color"], tag["id"], tag["automation_ids"]))
        })
    }

    static save() {
        DatabaseUtils.save_tags(TagController.tags)
    }

    static create(name, color) {
        TagController.tags.push(new Tag(name, color, Utils.create_id()))
    }

    static create_empty() {
        TagController.tags.push(new Tag("", ColorController.colors[0], Utils.create_id()))
    }

    static remove_tag(r_tag) {
        TagController.tags = TagController.tags.filter((tag) => tag.id != r_tag.id)
    }
}  