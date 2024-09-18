import Sample from "../models/Sample"
import DatabaseUtils from "../utils/DatabaseUtils"
import Utils from "../utils/Utils"


export default class SampleController {

    static samples = []

    static initialize_from_database() {
        const database_samples = DatabaseUtils.get_samples()
        database_samples.forEach((sample) => {
            SampleController.samples.push(new Sample(sample["path"], sample["id"]))
        })
    }

    static get_by_id(id) {
        return this.samples.find((sample) => sample.id == id)
    }

    static get_by_path(path) {
        return this.samples.find((sample) => sample.path == path)
    }

    static get_or_create_by_path(path) {
        let sample = this.get_by_path(path)
        if (sample == null) {
            sample = new Sample(path, Utils.create_id())
            SampleController.samples.push(sample)
        }
        return sample
    }

    static save() {
        DatabaseUtils.save_samples(SampleController.samples)
    }
}  