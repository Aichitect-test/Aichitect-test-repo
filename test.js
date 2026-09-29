const { createRepository } = require('./repository');
const assert = require('assert');
const fs = require('fs');
async function test() {
  const dbPath = './test.sqlite';
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  const repo = await createRepository(dbPath);
  await repo.add({ description: 'Test', deadline: '2023-12-31', status: 'Pending' });
  const tasks = await repo.getAll();
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].description, 'Test');
  console.log('Tests passed');
  fs.unlinkSync(dbPath);
}
test().catch(console.error);