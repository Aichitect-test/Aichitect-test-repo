const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
let db;
async function init() {
  const SQL = await initSqlJs();
  const dir = './data'; if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const dbPath = path.join(dir, 'app.sqlite');
  if (fs.existsSync(dbPath)) db = new SQL.Database(fs.readFileSync(dbPath));
  else { db = new SQL.Database(); db.run('CREATE TABLE orders (id TEXT, email_hash TEXT, status TEXT)'); }
  return { save: (id, hash, status) => { db.run('INSERT INTO orders VALUES (?,?,?)', [id, hash, status]); fs.writeFileSync(dbPath, Buffer.from(db.export())); }, get: (id) => db.exec('SELECT * FROM orders WHERE id=?', [id]) };
}
module.exports = { init };