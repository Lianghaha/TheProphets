const express = require("express")
const router = express.Router()
const mySqlConnection = require("../config/SQL-config")
const utilities = require("../utilities")

router.get("/", (req, res) => {
   var query = "SELECT * FROM camps"
   const campsPromise = utilities.sqlPromise(query)
   campsPromise
      .then((result) => {
         console.log("Load Camps Successed!")
         res.render("home.ejs", {
            test: result[1]["image"]
            // message: req.flash("error"),
         })
      })
      .catch((err) => console.log(err))
})

module.exports = router
