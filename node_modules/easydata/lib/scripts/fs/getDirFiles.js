
const fs = require('fs');
const scripts = require('../../index.js');

module.exports = async function (path) {

    let newPromise = new Promise( async function (resolve, reject) {

        let fixedPath = scripts.fixInput.path(path);
        if (!fixedPath.success) return resolve({
            success: false,
            message: fixedPath.message
        })

        fs.readdir(fixedPath.path, function (err, files) {
            if (err) return resolve({
                success: false,
                message: err
            })

            resolve({
                success: true,
                files  : files
            })
        })

    })

    return newPromise;
    
}