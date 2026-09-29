const assert = require('assert');
const validator = require('./validator');
const repo = require('./repository');
const fs = require('fs');
async function run() {
  try {
    const task = { title: 'Test', deadline: '2099-01-01', status: 'pending' };
    const valid = validator.validate(task);
    await repo.save(valid);
    console.log('Test passed');
  } catch (e) { console.error(e); process.exit(1); }
}
run();