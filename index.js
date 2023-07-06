const express = require(`express`)
const bodyParser = require(`body-parser`)
const mongoose = require(`mongoose`)
const Todo = require("./models/todo")


const port = 3000


require(`dotenv`).config()
const app = express()

// Html y Css
app.set(`view engine`, `ejs`)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// ConectMongo
const dburl = "mongodb://localhost:27017/tododb"
mongoose.connect(process.env.MONGO_DB_URI)

// mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true})



// CRUD Get
app.get("/",(req, res) => {
  Todo.find()
  .then(result => {
    res.render(`index`, {data: result })
    console.log(result)
  })
})

// CRUD Post
app.post("/",(req,res) => {
  const todo = new Todo({
      todo: req.body.todoValue

  })
  todo.save()
  .then(result =>{
      res.redirect("/")
  })
})

// CRUD Delete
app.delete(`/:id`, (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
    .then(result => {
      console.log(result)
    })

})

// CRUD Update
app.put(`/update/:id`, (req, res) =>{
  const id = req.params.id;

  res.send(`Dato actualizado correctamente`)
})

// Listen Port
app.listen(port,() => {
  console.log("Port: " + port)
})


// Routers
// const authorRouters = require(`./routers/author`)


// app.use(express.json())
// app.use(`/api/author`, authorRouters)



// app.post('/api/author/create', ControllerAuthor.create)
