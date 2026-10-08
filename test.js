const assert = require('assert');
const repo = require('./repository');
async function run() {
  await repo.init();
  try {
    await repo.save('test', 'user');
    console.log('Test passed');
  } catch (e) { console.error(e); process.exit(1); }
}
run();