var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "jarazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

});

var logo = 
`--     __                                    
--    |__.---.-.----.---.-.-----.-----.-----.
--    |  |  _  |   _|  _  |-- __|  _  |     |
--    |  |___._|__| |___._|_____|_____|__|__|
--   |___|                                   
--                                                                                      `;

console.log(logo);