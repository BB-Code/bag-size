const path = require('path');
const fs = require('./fs');

async function test() {
    let res1 = await fs.getFloderSize(path.join(__dirname, '/tmp'));
    console.log(res1 + ' bytes');
    console.log((res1 / 1024 / 1024).toFixed(2) + ' MB');
    if (await fs.existsPath(path.join(__dirname, '/tmp'))) {
        console.log('不存在');
    } else {
        console.log('已存在');
        await fs.writeFile(path.join(__dirname, '/tmp/1.txt'), 'hello world');
        let res = await fs.readFile(path.join(__dirname, '/tmp/1.txt'));
        console.log(res.toString());
        let result = await fs.rmf(path.join(__dirname, '/tmp/1.txt'));
        console.log(result);
    }
}

test();
