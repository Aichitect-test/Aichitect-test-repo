const fs = require('fs');
const initSqlJs = require('sql.js');
const DB_PATH = './data/app.sqlite';
module.exports = {
  save: async (task) => {
    if (!fs.existsSync('./data')) fs.mkdirSync('./data');
    const SQL = await initSqlJs();
    let db;
    if (fs.existsSync(DB_PATH)) db = new SQL.Database(fs.readFileSync(DB_PATH));
    else { db = new SQL.Database(); db.run('CREATE TABLE tasks (title TEXT, deadline TEXT, status TEXT)'); }
    db.run('INSERT INTO tasks VALUES (?, ?, ?)', [task.title, task.deadline, task.status]);
    fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  }
};