const express = require("express")
const router = express.Router()
const mySqlConnection = require("../config/SQL-config")
const utilities = require("../utilities")

router.get("/", (req, res) => {
   var query = "SELECT * FROM test"
   const campsPromise = utilities.sqlPromise(query)
   campsPromise
      .then((result) => {
         console.log("Load Camps Successed!")
         res.render("home.ejs", {
            test: result[0]["img"]
            // message: req.flash("error"),
         })
      })
      .catch((err) => console.log(err))
})

module.exports = router
