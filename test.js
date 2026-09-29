const assert = require('assert');
const service = require('./taskService');
const repo = require('./taskRepository');
async function runTests() {
  await repo.init();
  try {
    service.register({title: 'Test', deadline: '2099-01-01', status: 'Pending'});
    console.log('Success test passed');
  } catch(e) { assert.fail(); }
  try {
    service.register({title: 'Test', deadline: '2099-01-01', status: 'Invalid'});
    assert.fail();
  } catch(e) { console.log('Validation test passed'); }
}
runTests();