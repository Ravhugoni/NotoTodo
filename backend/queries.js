const config = require('./configaration')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todolist',
  password: 'Letsdoit!',
  port: 5433,
})

const getToDoList = (request, response) => {

  pool.query('SELECT * FROM public."todolisttb" ORDER BY id ASC ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getToDoListById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM public."todolisttb" WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createToDoList = (request, response) => {
  const { name, isComplete} = request.body

  pool.query('INSERT INTO public."todolisttb" (name, "isComplete") VALUES ($1, $2)', [name, isComplete], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`ToDoList added with ID: ${results.insertId}`)
  })
}
        
const updateToDoList = (request, response) => {
  const id = parseInt(request.params.id)
  const { name } = request.body

  pool.query(
    'UPDATE public."todolisttb" SET name = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`todolisttb modified with ID: ${id}`)
    }
  )
}

const completeToDoList = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, isComplete } = request.body
  
    pool.query(
      'UPDATE public."todolisttb" SET name = $1, "isComplete" = $2 WHERE id = $3',
      [name, isComplete, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`todolisttb modified with ID: ${id}`)
      }
    )
  }

const deleteToDoList = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM public.todolisttb WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`todolisttb deleted with ID: ${id}`)
  })
}

module.exports = {
    getToDoList,
    getToDoListById,
    createToDoList,
    updateToDoList,
    completeToDoList,
    deleteToDoList, 
}