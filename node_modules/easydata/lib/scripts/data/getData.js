

const fs = require('fs');
const scripts = require('../../index.js');

module.exports = async function (key, self, isInternal) {

    let newPromise = new Promise ( async function (resolve, reject) {

        let handleErrors = (e) => {
            if (self._.ignoreErrors) return resolve(null);
            reject(e);
        }
    
        let dataPath = scripts.fixInput.path(self._.paths.dataFolder);
        if (dataPath.success !== true) return handleErrors(dataPath.message);
        dataPath = dataPath.path + `${key}.data`;
        

        let doesExist = await scripts.fs.exists(dataPath);
        if (doesExist.success !== true) return handleErrors(doesExist.message);
        doesExist = doesExist.result;

        if (doesExist !== true) return handleErrors(`No data saved with that key!`);

        fs.readFile(dataPath, {encoding: 'utf8'}, async function (err, fileData) {
    
            if (err) return handleErrors(err);
    
            let parsedData = await scripts.data.parseData(fileData, isInternal);
            if (parsedData.success !== true) return handleErrors(parsedData.message);

            resolve(parsedData.data);
        })

    })

    return newPromise;
}