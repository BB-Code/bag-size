const fs = require('fs');
const util = require('util');

const mkdir = util.promisify(fs.mkdir);
const wFile = util.promisify(fs.writeFile);
const rFile = util.promisify(fs.readFile);
const eFile = util.promisify(fs.access);

exports.existsPath = (filepath) => {
    eFile(filepath).catch((err) => {
        if (err.errno === -4058) {
            console.log(filepath);
            mkdir(filepath).catch((err) => {
                console.log(err);
            });
        }
    });
};

exports.writeFile = (filepath, data, encoding) => {
    wFile(filepath, data, encoding);
};

exports.readFile = async (filepath, type) => {
    if (type === 'json') {
        return JSON.parse(await rFile(filepath, 'utf-8'));
    } else {
        return await rFile(filepath);
    }
};

exports.getFloderSize = util.promisify(require('get-folder-size'));

exports.rmf = util.promisify(require('rimraf'));
