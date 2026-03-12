const fs = require('fs');

const en = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));
const tr = JSON.parse(fs.readFileSync('./messages/tr.json', 'utf8'));

function getKeys(obj, prefix = '') {
    let keys = [];
    for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            keys = keys.concat(getKeys(obj[key], fullKey));
        } else {
            keys.push(fullKey);
        }
    }
    return keys;
}

const enKeys = getKeys(en);
const trKeys = getKeys(tr);

const missingInTr = enKeys.filter(key => !trKeys.includes(key));

console.log('Missing keys in tr.json:', missingInTr);
