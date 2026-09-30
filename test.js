const assert = require('assert');
const repo = require('./repository');
async function test() {
  await repo.init();
  await repo.save('1+1', 2);
  console.log('Test passed');
}
test().catch(e => { console.error(e); process.exit(1); });