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

var logo =
  `                                                                                      
     __                                    
    |__.---.-.----.---.-.-----.-----.-----.
    |  |  _  |   _|  _  |-- __|  _  |     |
    |  |___._|__| |___._|_____|_____|__|__|
   |___|                                   
`;

console.log(logo);

function intialPrompt() {
    inquirer.prompt([{
        message: "What would you like to check out?",
        type: "list",
        choices: ["View products for sale", "Check low inventory", "Add to inventory", "Add new product"],
        name: "option"
    }]).then(function(res){
        switch (res.option) {
            case "View products for sale":
                showProducts(`* from products`,intialPrompt);
                break;
        
            case "Check low inventory":
                showProducts(`* from products where quantity < 5`,intialPrompt);
                break;
        
            case "Add to inventory":
                showProducts(`* from products`,buy);
                break;
        
            case "Add new product":
                addItem();
                break;
        
            default:
                break;
        }
    });
}

function showProducts(searchParam, fn) {
  connection.query(`select ${searchParam}`, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(
        `
      ${res[i].id} Item: ${res[i].item} 
      Price: $${res[i].price} 
      Quantity: ${res[i].quantity}`);

    }
    console.log(`     ----------------------------------`);
    fn();
  });
}

function addItem() {
  inquirer.prompt([{
      message: `What item would you like to add to jarazon?`,
      name: `item`,
      type: `input`
    },
    {
      message: `What price would you like to set it at?`,
      name: `price`,
      type: `number`
    },
    {
      message: `How many do you have to sell?`,
      name: `quantity`,
      type: `number`
    },
    {
      message: `What department does it best fit under?`,
      name: `dept`,
      choices: ['Personal Household Goods', `Garage Stuff`, `Acquired Items`],
      type: `list`
    }
  ]).then(function (res) {

    connection.query(`INSERT INTO products SET ?`, {
      item: res.item,
      price: res.price,
      quantity: res.quantity,
      department_name: res.dept
    }, function (err) {
      if (err) throw err;
      console.log(
        `
        Information added! - 
    Item: ${res.item} 
    Price: $${res.price} 
    Quantity: ${res.quantity}`);
    setTimeout(() => {
      intialPrompt();
    }, 2000);
    });
  })
}

function buy() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;

    inquirer.prompt([{
        message: "What number would you like to add to?",
        type: "rawlist",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].id);
          }
          return choiceArray;
        },
        name: "item"
      },
      {
        message: "How many would you like to add?",
        name: "quantity",
        input: "number"
      }

    ]).then(function (res) {
      var arrayItem = res.item - 1;
        var amount = parseInt(results[arrayItem].quantity) + parseInt(res.quantity);
        confirmPrice(results[arrayItem].price, res.quantity, res.item, amount, results[arrayItem].item.toLowerCase());
    });
  });
}

function confirmPrice(price, quantity, id, amount, productName) {
  inquirer.prompt([{
    message: `This will add ${quantity} to ${productName}. Is that alright?`,
    type: "confirm",
    name: "confirm"
  }]).then(function (res) {
    if (res.confirm) {
      console.log(`Add ${quantity} to ${productName}. There are now ${amount} available for purchase.`);
      connection.query("UPDATE products SET ? WHERE ?",
        [{
            quantity: amount
          },
          {
            id: id
          }
        ],
        function (err, results) {
          if (err) throw err;
        }
      );
      intialPrompt();
    } else {
      console.log("Let's try again!");
      intialPrompt();
    }
  });
}