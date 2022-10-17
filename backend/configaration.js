const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todolist',
  password: 'Letsdoit!',
  port: 5433,
})