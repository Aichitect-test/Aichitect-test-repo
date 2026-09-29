const assert = require('assert');
const http = require('http');
process.env.TASK_TOKEN = 'test-token';
const app = require('./server');
async function runTests() {
  const task = { title: 'Test', deadline: '2099-01-01', status: 'pending' };
  const req = (opts, body) => new Promise(resolve => {
    const r = http.request({ port: 3010, method: 'POST', path: '/tasks', headers: {'Authorization': 'test-token', 'Content-Type': 'application/json'} }, res => resolve(res));
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
  const res = await req({}, task);
  assert.strictEqual(res.statusCode, 201);
  const res2 = await req({}, { ...task, status: 'invalid' });
  assert.strictEqual(res2.statusCode, 400);
  console.log('Tests passed');
  process.exit(0);
}
setTimeout(runTests, 1000);