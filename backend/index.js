const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
  
// var corsOptions = {
//     origin: "http://localhost:3000"
//   };
//   app.use(cors(corsOptions));
  


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/list', db.getToDoList)
app.get('/list/:id', db.getToDoListById)
app.post('/list', db.createToDoList)
app.put('/list/:id', db.updateToDoList)
app.delete('/list/:id', db.deleteToDoList)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })