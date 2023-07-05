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

app.get("/",(req, res) => {
  res.render(`index`)
})

app.post("/",(req,res) => {
  const todo = new Todo({
      todo: "testing"

  })
  todo.save()
  .then(result =>{
      res.redirect("/")
  })
})

app.listen(port,() => {
  console.log("Port: " + port)
})


// // Routers
// const authorRouters = require(`./routers/author`)


// app.use(express.json())
// app.use(`/api/author`, authorRouters)



// // app.post('/api/author/create', ControllerAuthor.create)

// mongoose.connect(process.env.MONGO_DB_URI)
// .then(() => console-log(`Conect to db`))
// .catch((err)=> console.error(err))

