const assert = require('assert');
const repo = require('./repository');
async function run() {
  await repo.init();
  try { await repo.saveOrder('test@example.com'); console.log('Test passed'); }
  catch (e) { console.error('Test failed', e); process.exit(1); }
}
run();