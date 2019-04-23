

const fs      = require('fs');
const path    = require('path');
const scripts = require('../../index.js');

module.exports = async function ( key, value, _type, self ) {

    let newPromise = new Promise(async function (resolve, reject) {

        let handleError = (e) => {
            if (self._.ignoreErrors) return resolve(null);
            reject(e);
        }

        if (!key || !value) return handleError(`Did not provide key or value`);

        if (!isAlphanumerical(key)) return handleError(`Key provided was not consisting of alphanumerical characters`);

        let getType = (typeof(_type) === 'string' ? _type.toString().toLowerCase() : null || typeof(value));
        if (!getType) return handleError(`The type of the value provided, was ${getType}`);
        let theType = getType.toLowerCase();

        if (theType !== 'boolean' && theType !== 'object' && theType !== 'number' && theType !== 'string') return handleError(`Provided a non-supported value type, (${theType})`);

        let formatTempData = `>${theType}<|${Date.now()}||>${self._.compress}<|//${value}`;
        let tempDataPath = scripts.fixInput.path(self._.paths.tmpFolder);
        if (tempDataPath.success !== true) return handleError(tempDataPath.message);
        tempDataPath = tempDataPath.path + `tmp.${key}.tmp`;

        fs.writeFile(tempDataPath, formatTempData, async function(err) {
            if (err) return handleError(err);

            let preparedData = await scripts.data.prepareData(value, theType, self);
            let dataPath = scripts.fixInput.path(self._.paths.dataFolder);
            if (dataPath.success !== true) return handleError(dataPath.message);
            dataPath = dataPath.path + `${key}.data`

            
            fs.writeFile(dataPath, preparedData, function (err) {
                if (err) return handleError(err);
                fs.unlink(tempDataPath, function (err) {
                    if (err) return handleError(err);
                    resolve(true);
                })
            })
        })

    })
    
    return newPromise;

}


const isAlphanumerical = (input) => {
    var code, i, len;

    for (i = 0, len = input.length; i < len; i++) {
        code = input.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
    }
    return true;
}