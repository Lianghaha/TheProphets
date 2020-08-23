var mysql = require("mysql")

//test
var dataBase = {
   host: "localhost",
   user: "root",
   password: process.env.LOCAL_PW,
   database: "ha",
   multipleStatements: true,
}

var awsDB = {
   host: process.env.AWS_END_POINT,
   user: "root",
   password: process.env.AWS_PW,
   database: "haha",
   multipleStatements: true,
}

if (process.env.NODE_ENV === "deploy") {
   dataBase = awsDB
}

console.log(dataBase);

var mySqlConnection = mysql.createConnection(dataBase)

module.exports = mySqlConnection 