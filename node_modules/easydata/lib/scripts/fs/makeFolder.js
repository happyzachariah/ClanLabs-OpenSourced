// This script makes a directory/folder asynchronously 

const fs = require('fs');


module.exports = async function (path) {
    let newPromise = new Promise(function (resolve, reject) {

        fs.mkdir(path, function (err) {

            if (err) return resolve({
                success: false,
                message: err
            })

            resolve({
                success: true
            })

        })

    })

    return newPromise;
}