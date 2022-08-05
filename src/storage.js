const path = require('path');
const envPaths = require('env-paths');
const { existsPath, readFile, writeFile } = require('./fs');

const { config } = envPaths('bag-size');

const FILE = path.join(config, 'storage.json');

console.log(FILE);

let data;

module.exports = {
    async set(key, value) {
        data = data || (await this.get());
        data[key] = value;
        await writeFile(FILE, JSON.stringify(data), 'utf-8');
    },
    async get(key) {
        if (!data) {
            if (await existsPath(FILE)) {
                data = JSON.parse(await readFile(FILE));
            } else {
                await this.clear();
            }
        }
        return key ? data[key] : data;
    },
    async clear() {
        data = {};
        await writeFile(FILE, '{}', 'utf-8');
    },
};
