// Routing app


exports.fixInput = {};
exports.fixInput.path = require('./scripts/fixInput/path');


exports.compression = {};
exports.compression.compress = require('./scripts/compression/compress');
exports.compression.decompress = require('./scripts/compression/decompress');


exports.fs = {};
exports.fs.exists = require('./scripts/fs/exists');
exports.fs.getDirFiles = require('./scripts/fs/getDirFiles');
exports.fs.makeFolder = require('./scripts/fs/makeFolder');

exports.data = {};
exports.data.init = require('./scripts/data/init');
exports.data.getData = require('./scripts/data/getData');
exports.data.parseData = require('./scripts/data/parseData');
exports.data.saveData = require('./scripts/data/saveData');
exports.data.prepareData = require('./scripts/data/prepareData');
exports.data.deleteData = require('./scripts//data/deleteData');