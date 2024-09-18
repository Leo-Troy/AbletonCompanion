import * as fs from 'fs';
const zlib = require('zlib');

export default class XmlParser {

    static live_sets = []
    static is_parsing = false
    static interval_id = null

    static parse_ableton_project(live_set) {
        XmlParser.live_sets.push(live_set)
        if (XmlParser.interval_id == null) {
            XmlParser.interval_id = setInterval(XmlParser.update, 1000 / 30);
        }
    }

    static update() {
        if (XmlParser.live_sets.length != 0 && !XmlParser.is_parsing) {
            XmlParser.parse(XmlParser.live_sets[0])
        }
    }

    static parse(live_set) {
        XmlParser.is_parsing = true
        const readStream = fs.createReadStream(live_set.path);
        const decompressionStream = zlib.createGunzip();
        readStream.pipe(decompressionStream);
        const outputStringStream = require('stream').PassThrough();
        decompressionStream.pipe(outputStringStream);
        let decompressedContent = '';
    
        outputStringStream.on('data', (chunk) => {
            decompressedContent += chunk.toString('utf8');
        });
    
        outputStringStream.on('end', () => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(decompressedContent, 'text/xml');
            live_set.resolve(xmlDoc)
            XmlParser.live_sets.shift()
            XmlParser.is_parsing = false
        });
    }
    
}