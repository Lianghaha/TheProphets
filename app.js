// Express
const express = require("express")
const app = express()

app.get("/", (req, res) => {
   res.render("home.ejs")
})

app.listen(process.env.PORT || 3000, process.env.IP, (req, res) => {
   console.log("Server Started")
})
console.log(process.env.PORT)
