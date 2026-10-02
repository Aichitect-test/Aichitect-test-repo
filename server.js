const express = require('express');
const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const app = express();
const PORT = process.env.PORT || 3010;
const DB_PATH = './data/app.sqlite';
app.use(express.json());
app.use(express.static('public'));
let db;
async function initDb() {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) db = new SQL.Database(fs.readFileSync(DB_PATH));
  else { db = new SQL.Database(); db.run('CREATE TABLE calculations (id INTEGER PRIMARY KEY, expression TEXT, result REAL)'); }
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
}
app.post('/calculate', (req, res) => {
  if (req.headers.authorization !== process.env.TASK_TOKEN) return res.status(401).send('Unauthorized');
  const { expression, result } = req.body;
  db.run('INSERT INTO calculations (expression, result) VALUES (?, ?)', [expression, result]);
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  res.json({ success: true });
});
initDb().then(() => app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`)));