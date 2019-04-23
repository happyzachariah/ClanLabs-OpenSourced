

const scripts = require('../../index.js');

module.exports = async function (path, name, self) {

    try {

        let dataFolderPath = scripts.fixInput.path(path, name);
        if (dataFolderPath.success !== true) throw new Error(dataFolderPath.message);
        dataFolderPath = dataFolderPath.path;

        let dataFolderExists = await scripts.fs.exists(dataFolderPath);
        if (dataFolderExists.success !== true) throw new Error(dataFolderExists.message);
        dataFolderExists = dataFolderExists.result;

        if (dataFolderExists !== true) {

            let createDataFolder = await scripts.fs.makeFolder(dataFolderPath);
            if (createDataFolder.success !== true) throw new Error(createDataFolder.message);

        }

        let tmpFolderPath = dataFolderPath + 'tmp';
        let tmpFolderExists = await scripts.fs.exists(tmpFolderPath);
        if (tmpFolderExists.success !== true) throw new Error(tmpFolderExists.message);
        tmpFolderExists = tmpFolderExists.result;

        if (tmpFolderExists !== true) {

            let createTmpFolder = await scripts.fs.makeFolder(tmpFolderPath);
            if (createTmpFolder.success !== true) throw new Error(createTmpFolder.message);

        }

        self._.paths.dataFolder = dataFolderPath;
        self._.paths.tmpFolder  = tmpFolderPath;

        return true;

    } catch (err) {
        if (self._.ignoreErrors) return false;
        throw new Error(err);
    }

}