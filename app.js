//Enviromental Variables
console.log("process.env.NODE_ENV: " + process.env.NODE_ENV)
if (process.env.NODE_ENV !== "deploy") {
   require("dotenv").config()
}

console.log("process.env.AWS_END_POINT: " + process.env.AWS_END_POINT)


// Express
const express = require("express")
const app = express()

// Public directory for css/js/image
app.use(express.static(__dirname + "/public"))

// Flash
// const flash = require("connect-flash")
// app.use(flash())

//SQL
const mySqlConnection = require("./config/SQL-config")
mySqlConnection.connect((err) => {
   if (err) {
      console.log(
         "Database not connected! : " + JSON.stringify(err, undefined, 2)
      )
   } else console.log("Database Connected!")
})

const homeRoutes = require("./routes/home.js")
app.use(homeRoutes)

app.listen(process.env.PORT || 3000, process.env.IP, (req, res) => {
   console.log("Server Started")
})
console.log("process.env.PORT: " + process.env.PORT)
