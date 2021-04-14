const fs = require('fs')
const {COUNT, OFFSET, VERSION, FILENAME} = require('./constants');
const {saveTypedArrayFile} = require('./files');

const tarr = new Uint32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  tarr[i] = i * 2;
}

if (fs.existsSync(FILENAME)) fs.unlinkSync(FILENAME)

saveTypedArrayFile(FILENAME, VERSION, OFFSET, COUNT, tarr);
setTimeout(() => {
  process.exit(0);
}, 6)
