const {COUNT, OFFSET, VERSION, FILENAME} = require('./constants');
const {loadTypedArrayFile} = require('./files');
const fs = require('fs')

function quit(err) {
  console.error('FAILURE\n');
  console.error(err);
  process.exit(1);
}

if (!fs.existsSync(FILENAME)) process.exit(0)

loadTypedArrayFile(FILENAME, Uint32Array, (err, res) => {
  if (err) return quit(err);

  const {version, offset, count, tarr} = res;
  if (version !== VERSION) return quit('version: ' + version);
  if (offset !== OFFSET) return quit('offset: ' + offset);
  if (count !== COUNT) return quit('count: ' + count);
  for (let i = 0; i < COUNT; i++) {
    if (tarr[i] !== i * 2) return quit(`tarr[${i}]: ${i * 2}`);
  }

  console.log('all good');
});
