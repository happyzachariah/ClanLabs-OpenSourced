// Entry file for easysave

const scripts = require('./lib');

class EasySave {

    /**
     * 
     * @param {Object} options 
     * @param {Boolean} options.cache If you want the module to cache the results and when you save, defaults to "true"
     * @param {Boolean} options.compress If you want to compress the data to make it use less space, defaults to "true"
     * @param {Boolean} options.ignoreErrors If you want the module to ignore errors when an error happened, and instead return null or false, defaults to "true"
     * @param {String} options.name The name of the folder to create, default to ".data"
     * @param {String} options.path The path to the folder where to save the data, defaults to "./"
     */


    constructor (options) {

        // Create an object "options" if the user did not provide one

        options = options || {};

        this._ = {

            cacheEnabled: typeof(options.cache) === 'boolean' ? options.cache : true,
            compress: typeof(options.compress) === 'boolean' ? options.compress : true,
            ignoreErrors : typeof(options.ignoreErrors) === 'boolean' ? options.ignoreErrors : true,
            name        : String(options.name || '.data').toString(),
            path        : String(options.path || './'),
            

            paths: {
                dataFolder: null,
                tmpFolder : null
            },

            cache : {}

        };
    }


    /**
     * 
     * @param {String} key The identifier for the data saved 
     * @param {any} value The data itself
     * @param {String} type You can override the type, must be either 'boolean', 'object', 'number' or 'string'
     */
    async save (key, value, type) {
        return scripts.data.saveData(key, value, type, this);
    }

    async get (key) {
        return scripts.data.getData(key, this);
    }
    
    async delete (key) {
        return scripts.data.deleteData(key, this);
    }


    async init () {
        return scripts.data.init(this._.path, this._.name, this);
    }

}

module.exports = EasySave;