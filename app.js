// Express
const express = require("express")
const app = express()

// Public directory for css/js/image
app.use(express.static(__dirname + "/public"))

//SQL
const mySqlConnection = require("./config/SQL-config")
mySqlConnection.connect((err) => {
   if (err) {
      console.log(
         "Database not connected! : " + JSON.stringify(err, undefined, 2)
      )
   } else console.log("Database Connected!")
})


app.get("/", (req, res) => {
   res.render("home.ejs")
})

app.listen(process.env.PORT || 3000, process.env.IP, (req, res) => {
   console.log("Server Started")
})
console.log(process.env.PORT)
