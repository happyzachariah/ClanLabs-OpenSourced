
const fs = require('fs');
const scripts = require('../../index.js');

module.exports = async function(key, self) {

    let newPromise = new Promise(async function(resolve, reject) {

        let handleError = (e) => {
            if (self._.ignoreErrors) return resolve(false);
            reject(e);
        }
    
        let dataFolderPath = scripts.fixInput.path(self._.paths.dataFolder);
        if (dataFolderPath.success !== true) return handleError(dataFolderPath.message);
        dataFolderPath = dataFolderPath.path + `${key}.data`;
    
        let doesExist = await scripts.fs.exists(dataFolderPath);
        if (doesExist.success !== true) return handleError(doesExist.message);
        doesExist = doesExist.result;
    
        if (doesExist) {
            fs.unlink(dataFolderPath, function (err) {
                if (err) return handleError(err);
                resolve(true);
            })
        } else return resolve({
            success: true
        })

    })

    return newPromise;
    
}