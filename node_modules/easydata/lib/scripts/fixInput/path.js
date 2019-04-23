// This script is meant to fix path given by the users

const path = require('path');
const url = require('url');

module.exports = function (...input) {

    // Wrapping it in a try-catch to make sure it doesn't fail when user gives invalid input

    try {

        // Uses NodeJS' native module "path" to merge all paths

        let makePath = path.join(...input);

        // Must end with '/'
        if (!makePath.endsWith('/')) {
            makePath += '/';
        };

        return {
            success: true,
            path: makePath
        }

    } catch (err) {
        return {
            success: false,
            message: err
        }
    }
}