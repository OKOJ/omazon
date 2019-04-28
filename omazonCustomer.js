// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "VIKA1979GARIK2004",
    database: "omazondb"
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    start();
});
function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        choosingProduct();
    })
}
function choosingProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "items_id",
                message: "Enter item id of the product you would like to purchase.",
                
            }
        ]).then(function (product) {
            for (var i = 0; i < res.length; i++) {
                if (product.items_id == res[i].item_id) {
                    var prod = i;
                    inquirer.prompt([{
                        type: "input",
                        name: "quantity",
                        message: "How many " + res[i].product_name + "s would you like to purchase?",
                        
                    }]).then(function (cart) {
                        if (res[prod].stock_quantity >= cart.quantity) {
                            var total = cart.quantity * res[prod].price;
                            console.log("You total is $" + total);
                        }
                        if (res[prod].stock_quantity < cart.quantity) {
                            console.log("We have " + res[prod].stock_quantity + " in stock");
                        
                        }
                        if (res[prod].stock_quantity === 0) {
                            console.log("This item is out of stock")
                        }

                    })
                }
            }
        })

    });
}
/*function purchase(){
    var total = cart.quantity * res[prod].price;
    console.log("You total is $" + total);
}*/

//function updateProduct()

/*inquirer.prompt([{
    type: "list",
    message: "Would you like to buy them all?",
    choices:["Buy them all","Buy new quantity","Think  about it"]
}])*/