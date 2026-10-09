const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
let db;
async function init() {
  const dir = './data';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const SQL = await initSqlJs();
  const dbPath = path.join(dir, 'app.sqlite');
  if (fs.existsSync(dbPath)) db = new SQL.Database(fs.readFileSync(dbPath));
  else { db = new SQL.Database(); db.run('CREATE TABLE refunds (id TEXT, userId TEXT, status TEXT)'); }
  return db;
}
async function save() { fs.writeFileSync('./data/app.sqlite', Buffer.from(db.export())); }
module.exports = { init, save, getDb: () => db };