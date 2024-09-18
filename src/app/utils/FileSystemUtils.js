import * as fs from 'fs';
import * as path from 'path';

export default class FileSystemUtils {

    static get_all_project_path(directoy_path, fileList = []) {
        const files = fs.readdirSync(directoy_path);
        files.forEach((file) => {
            const file_path = path.join(directoy_path, file);
            const file_stat = fs.statSync(file_path);

            if (file_stat.isDirectory()) {
                if (file != "Backup") {
                    FileSystemUtils.get_all_project_path(file_path, fileList);
                }
            } else if (file.endsWith(`.als`)) {
                if (!(fileList.includes(directoy_path))) fileList.push(directoy_path)
            }
        });
        return fileList;
    }

    static get_all_live_set_path_in_project = (directoy_path) => {
        let file_list = []
        const files = fs.readdirSync(directoy_path);
        files.forEach((file) => {
            const file_path = path.join(directoy_path, file);
            const file_stat = fs.statSync(file_path);
    
            if (!file_stat.isDirectory() && file.endsWith(`.als`)) {
                file_list.push(file_path)
            }
        });
        return file_list;
    }
}
