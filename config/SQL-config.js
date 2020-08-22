var mysql = require("mysql")
var mySqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "ha",
    multipleStatements: true
})

module.exports = mySqlConnection 