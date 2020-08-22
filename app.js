// Express
const express = require("express")
const app = express()

// Public directory for css/js/image
app.use(express.static(__dirname + "/public"))


//test heroku

app.get("/", (req, res) => {
   res.render("home.ejs")
})

app.listen(process.env.PORT || 3000, process.env.IP, (req, res) => {
   console.log("Server Started")
})
console.log(process.env.PORT)
