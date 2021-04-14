const util = require('util');
const exec = util.promisify(require('child_process').exec);

const DEBUG = true;

(async function () {
  for (let i = 0; i < 10; i++) {
    if (DEBUG) console.log('\n');
    try {
      var {stdout, stderr} = await exec('node write.js');
      if (DEBUG) console.log('write stdout:', stdout);
      if (DEBUG) console.error('write stderr:', stderr);
    } catch (err) {
      console.error(err);
    }
    try {
      var {stdout, stderr} = await exec('node read.js');
      if (DEBUG) console.log('read stdout:', stdout);
      if (DEBUG) console.error('read stderr:', stderr);
    } catch (err) {
      console.log('read failed!');
      console.error(err);
      console.log('-----');
      console.error(Object.keys(err));
      console.error(err.killed);
      console.error(err.code);
      console.error(err.signal);
    }
  }
})();
