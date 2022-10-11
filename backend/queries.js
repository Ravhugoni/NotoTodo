const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todolist',
  password: 'Letsdoit!',
  port: 5433,
})

const getToDoList = (request, response) => {

  pool.query('SELECT * FROM public."todolistTb" ORDER BY id ASC ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getToDoListById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM todolistTb WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createToDoList = (request, response) => {
  const { name} = request.body

  pool.query('INSERT INTO todolistTb (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`ToDoList added with ID: ${results.insertId}`)
  })
}

const updateToDoList = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE todolistTb SET name = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`todolistTb modified with ID: ${id}`)
    }
  )
}

const deleteToDoList = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM todolistTb WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`todolistTb deleted with ID: ${id}`)
  })
}

module.exports = {
    getToDoList,
    getToDoListById,
  createToDoList,
  updateToDoList,
  deleteToDoList,
}