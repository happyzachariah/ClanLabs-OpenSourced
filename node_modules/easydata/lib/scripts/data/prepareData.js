

const scripts = require('../../index.js');

module.exports = async function (value, _type, self) {

    let handleError = (e) => {
        return {
            success: false,
            message: e
        }
    }

    if (!value) return `No value was provided`

    _type = _type || typeof(value);

    let dataToSave = {
        type: _type,
        data: value,
        latestUpdate: Date.now().toString()
    }

    let compress = self._.compress;

    let data = JSON.stringify(dataToSave);

    if (compress === true) {
        let compressedData = await scripts.compression.compress(data);
        if (compressedData.success !== true) return handleError(compressedData.message);
        data = Buffer.from('true' + compressedData.output.toString('base64'));
    };

    
    

    return data; 
}