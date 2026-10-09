const assert = require('assert');
const guard = require('./guard');
const req = { headers: { 'x-user-group': 'agent' } };
const res = { status: (s) => ({ json: (o) => assert.strictEqual(s, 403) }) };
guard(req, res, () => {});
console.log('Tests passed');