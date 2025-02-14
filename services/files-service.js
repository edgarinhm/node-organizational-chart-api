const fs = require('fs');
const { FILES_DIR } = require('../constants/files-constant');
const { promises: fsPromises } = fs;

class Files {
    path = FILES_DIR;

    async readFile(fileName, encoding = 'utf8') {
        return await fsPromises.readFile(path.join(__dirname, this.path, fileName), encoding);
    }

    async createFile(fileName, content) {
        return await fsPromises.writeFile(path.join(__dirname, this.path, fileName), content);
    }

    async updateFile(fileName, content) {
        return await fsPromises.appendFile(path.join(__dirname, this.path, fileName), content);
    }

    async deleteFile(fileName) {
        return await fsPromises.unlink(path.join(__dirname, this.path, fileName));
    }
}

module.exports = Files;