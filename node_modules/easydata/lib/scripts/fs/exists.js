const fs = require('fs');

module.exports = async function (path) {
    
    let newPromise = new Promise ( async function (resolve, reject) {

        try {

            let exists = fs.existsSync(path);

            resolve({
                success: true,
                result : exists
            })

        } catch ( err ) {
            resolve({
                success: false,
                message: err
            })
        }

    })
    
    return newPromise;
}