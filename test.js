const assert = require('assert');
const fs = require('fs');
const initSqlJs = require('sql.js');
async function test() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  db.run('CREATE TABLE calculations (id INTEGER PRIMARY KEY, expression TEXT, result REAL)');
  db.run('INSERT INTO calculations (expression, result) VALUES (?, ?)', ['1+1', 2]);
  const res = db.exec('SELECT * FROM calculations');
  assert.strictEqual(res[0].values[0][1], '1+1');
  assert.strictEqual(res[0].values[0][2], 2);
  console.log('Tests passed');
}
test().catch(console.error);