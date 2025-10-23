const express = require('express')
const router = require('./routes')
const path = require("node:path")
const app = express()
const port = 3000



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json())


app.use(express.urlencoded({ extended: true })); 
app.use(router)
app.listen(port, () => {
  console.log('Servidor sendo executado na porta',port)
})