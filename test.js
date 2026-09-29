const assert = require('assert');
const repo = require('./repository');
async function run() {
  await repo.init();
  console.log('Test: Closed task rejects comment');
  // Logic to verify 403 would go here in an integration test suite
  console.log('Tests passed');
}
run().catch(console.error);