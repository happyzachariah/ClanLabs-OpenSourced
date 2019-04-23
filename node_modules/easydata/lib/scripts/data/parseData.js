
const scripts = require('../../index.js');

module.exports = async function (fileData, isInternal) {

    let handleError = (e) => { 
        return {
            success: false,
            message: e
        }    
    };
    

    let isCompressed = (fileData.toString('utf8').substr(0,4).startsWith('true')) ? true : false;

    let data = fileData;

    if (isCompressed === true) {

        let decompressedData = await scripts.compression.decompress(Buffer.from(fileData.substr(4), 'base64'));
        if (decompressedData.success !== true) return handleError(decompressedData.message);
        data = decompressedData.output;

    }

    try {
    data = JSON.parse(data);
    } catch (err) {
        return handleError(err);
    }

    if (data && typeof(data) === 'object' && typeof(data.type) === 'string' && data.data !== null && data.latestUpdate !== null) {

        let getData = (data.type === 'boolean' ? Boolean(data.data) : data.type === 'object' ? data.data : data.type === 'number' ? Number(data.data) : data.type === 'string' ? data.data.toString() : null);
        if (getData === null) return handleError(`Failed to get data`);

        if (isInternal) return {success: true, data: data};
        return {
            success: true,
            data: getData
        }

    } else handleError(`Incorrect data read`); 
    
}