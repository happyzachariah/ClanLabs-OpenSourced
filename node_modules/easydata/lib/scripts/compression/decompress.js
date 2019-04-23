// This will decompress text using NodeJS' native module "zlib"

const zlib = require('zlib');

module.exports = async function (input) {

    let newPromise = new Promise(async function (resolve, reject) {

        if (input instanceof Buffer == false) input = new Buffer.from(input, 'base64');
        zlib.unzip(input, function (err, res) {


            // If there was an error, resolve the promise with success set to "false" and "message" as the error

            if (err) return resolve({
                success: false,
                message: err
            })

            // Everything went fine, resolve the promise with success set to "true" and "output" as the compressed content

            resolve({
                success: true,
                output: res
            })

        })

    })

    return newPromise;
}