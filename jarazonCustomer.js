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
  database: "jarazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  intialPrompt();
});

var welcome =
  `
           _                      _       
 _ _ _ ___| |___ ___ _____ ___   | |_ ___ 
| | | | -_| |  _| . |     | -_|  |  _| . |
|_____|___|_|___|___|_|_|_|___|  |_| |___|
`

var logo =
  `                                                                                      
     __                                    
    |__.---.-.----.---.-.-----.-----.-----.
    |  |  _  |   _|  _  |-- __|  _  |     |
    |  |___._|__| |___._|_____|_____|__|__|
   |___|                                   
`;

console.log(welcome + logo);

// *Shows all objects to be sold
function showProducts(fn) {
  connection.query("select * from products", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(
        `
      ${res[i].id} Item: ${res[i].item} 
      Dept: ${res[i].department_name} 
      Quantity: ${res[i].quantity}`);

    }
    console.log(`     ----------------------------------`);
    fn();
  });
}

function intialPrompt() {

  inquirer.prompt([{
    message: "What would you like to do?",
    type: "list",
    choices: ["See what I got", "Buy my stuff", "Add an item"],
    name: "option"
  }]).then(function (res) {
    switch (res.option) {
      case "Buy my stuff":
        showProducts(buy);
        break;

      case "See what I got":
        showProducts(intialPrompt);
        break;

      case "Add an item":

        break;

      default:
        break;
    }
  });
}

// * Will ask which item to purchase
function buy() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;

    inquirer.prompt([{
        message: "What number would you like to buy?",
        input: "list",
        choices: function () {
          
        },
        name: "item"
      },
      {
        message: "How many would you like to purchase?",
        name: "quantity",
        input: "number"
      }

    ]).then(function (res) {

    });
  });
}