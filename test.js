const assert = require('assert');
const repo = require('./repository');
async function test() {
  try {
    await repo.save('test', 100);
    console.log('Test passed: Database save successful');
  } catch (e) {
    console.error('Test failed', e);
    process.exit(1);
  }
}
test();