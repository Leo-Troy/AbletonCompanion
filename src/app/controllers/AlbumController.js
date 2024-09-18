import Album from "../models/Album"
import DatabaseUtils from "../utils/DatabaseUtils"
import Utils from "../utils/Utils"


export default class AlbumController {

    static albums = []

    static initialize_from_database() {
        const database_albums = DatabaseUtils.get_albums()
        database_albums.forEach((album) => {
            AlbumController.albums.push(new Album(album["name"], album["id"], album["image"], album["description"]))
        })
    }

    static get_by_id(id) {
        return this.albums.find((album) => album.id == id)
    }

    static save() {
        DatabaseUtils.save_albums(AlbumController.albums)
    }

    static create(name) {
        AlbumController.albums.push(new Album(name, Utils.create_id(), ""))
    }

    static create_empty() {
        AlbumController.albums.push(new Album("", Utils.create_id(), ""))
    }

    static remove_album(r_album) {
        AlbumController.albums = AlbumController.albums.filter((album) => album.id != r_album.id)
    }
}  