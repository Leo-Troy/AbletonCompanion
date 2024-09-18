import * as fs from 'fs';
import * as path from 'path';
import SampleController from '../controllers/SampleController';
import VstController from '../controllers/VstController';
import XmlParser from '../utils/XmlParser';
const zlib = require('zlib');
const { exec } = require('child_process');



export default class LiveSet {

    constructor(path, id, project_id, bpm, duration, track_count, samples_id, vsts_id, last_modified) {
        this.path = path
        this.id = id
        this.project_id = project_id
        this.bpm = bpm
        this.duration = duration
        this.track_count = track_count
        this.samples_id = samples_id
        this.vsts_id = vsts_id

        this.is_updated = false
        if (last_modified == null || new Date(last_modified) < this.get_last_modified()) {
            this.last_modified = this.get_last_modified()
            this.is_updated = true
        } else {
            this.last_modified = new Date(last_modified)
        }

        if (bpm == null || duration == null || track_count == null || samples_id == null || this.is_updated) this.set_ableton_file_properties()
        // if (this.get_name() == "Disco Stone") this.set_ableton_file_properties()
    }

    to_json() {
        return {
            "path": this.path,
            "id": this.id,
            "project_id": this.project_id,
            "bpm": this.bpm,
            "duration": this.duration,
            "track_count": this.track_count,
            "samples_id": this.samples_id,
            "vsts_id": this.vsts_id,
            "last_modified": this.last_modified,
        }
    }

    get_last_modified() {
        const fileStat = fs.statSync(this.path);
        return fileStat.mtime
    }

    get_creation_date() {
        const fileStat = fs.statSync(this.path);
        // return fileStat.birthtime.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        return fileStat.birthtime;
    }

    get_size() {
        const fileStat = fs.statSync(this.path);
        return parseInt(fileStat.size / 1000)
    }

    get_name() {
        return path.basename(this.path).slice(0, -4);
    }

    set_ableton_file_properties() {
        XmlParser.parse_ableton_project(this)
    }

    resolve(xmlDoc) {
        this.set_bpm_from_xml(xmlDoc)
        this.set_duration_from_xml(xmlDoc)
        this.set_track_count_from_xml(xmlDoc)
        this.set_samples_from_xml(xmlDoc)
        this.set_vsts_from_xml(xmlDoc)
    }

    set_bpm_from_xml(xml) {
        const tempo = xml.querySelector('Tempo');
        const manual = tempo.querySelector('Manual');
        this.bpm = parseInt(manual.getAttribute("Value"))
    }

    set_duration_from_xml(xml) {
        const arranger_automation = xml.querySelector('ArrangerAutomation');
        const current_ends = arranger_automation.querySelectorAll('CurrentEnd');
        let max_time = 0
        current_ends.forEach((current_end) => {
            let time = parseFloat(current_end.getAttribute("Value"))
            if (time > max_time) max_time = time
        })
        const duration = max_time / this.bpm
        const int_part = parseInt(duration);
        const float_part = duration % 1;

        const nice_string = (n) => {
            return n >= 10 ? n.toString() : "0" + n.toString()
        }
        this.duration = nice_string(int_part) + ":" + nice_string(parseInt(float_part * 60))
    }

    set_track_count_from_xml(xml) {
        const midi_tracks = xml.querySelectorAll('MidiTrack');
        const audio_tracks = xml.querySelectorAll('AudioTrack');
        this.track_count = midi_tracks.length + audio_tracks.length
    }

    set_samples_from_xml(xml) {
        this.samples_id = []
        const sample_refs = xml.querySelectorAll('SampleRef');
        sample_refs.forEach((sample_ref) => {
            const file_ref = sample_ref.querySelectorAll('FileRef')[0]
            const path = file_ref.querySelectorAll('Path')[0]
            const path_value = path.getAttribute("Value")
            const sample = SampleController.get_or_create_by_path(path_value)
            if (!this.samples_id.includes(sample.id)) this.samples_id.push(sample.id)
        })
    }

    set_vsts_from_xml(xml) {
        this.vsts_id = []
        const vst_plugins_info = xml.querySelectorAll('VstPluginInfo');
        vst_plugins_info.forEach((vst_plugin_info) => {
            const path = vst_plugin_info.querySelectorAll('Path')[0]
            const path_value = path.getAttribute("Value")
            const vst = VstController.get_or_create_by_path(path_value)
            if (!this.vsts_id.includes(vst.id)) this.vsts_id.push(vst.id)
        })
    }

    open_on_ableton() {
        exec("\"" + this.path + "\"", (error, stdout, stderr) => {});
    }

    get_sample_count() {
        if (this.samples_id == null) return 0
        return this.samples_id.length
    }

    get_samples() {
        if (this.samples_id == null) return []
        return this.samples_id.map((sample_id) => SampleController.get_by_id(sample_id))
    }

    get_vsts() {
        if (this.vsts_id == null) return []
        return this.vsts_id.map((vst_id) => VstController.get_by_id(vst_id))
    }

    get_not_valid_sample_count() {
        if (this.samples_id == null) return 0
        return this.samples_id.filter((sample_id) => !SampleController.get_by_id(sample_id).is_valid()).length
    }

    get_vst_count() {
        if (this.vsts_id == null) return 0
        return this.vsts_id.length
    }

    get_not_valid_vst_count() {
        if (this.vsts_id == null) return 0
        return this.vsts_id.filter((vst_id) => !VstController.get_by_id(vst_id).is_valid()).length
    }

    get_duration_seconds() {
        if (this.duration == null) return 0
        const minute = parseInt(this.duration.split(":")[0])
        const seconds = parseInt(this.duration.split(":")[1])
        return minute * 60 + seconds
    }
}

/*

Bpm Duration AudioTracks MidiTracks Plugins Samples CreationDate


*/