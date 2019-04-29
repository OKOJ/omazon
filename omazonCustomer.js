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
        //choose an item by item_id
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
        //choose a quantity
                    inquirer.prompt([{
                        type: "input",
                        name: "quantity",
                        message: "How many " + res[i].product_name + "s would you like to purchase?",

                    }]).then(function (cart) {
                        if (res[prod].stock_quantity === 0) {
                            console.log("This item is out of stock")
                            console.log("Would you like to choose an other item?");
                            choosingProduct();

                        }
                        if (res[prod].stock_quantity >= cart.quantity) {
                            var total = (cart.quantity * res[prod].price).toFixed(2);
                            console.log("-----------------------------------------")
                            console.log("Thank you for your purchase.")
                            console.log("Your order is placed. Total:  $" + total);
                            console.log("-----------------------------------------")
                        }
                        if (res[prod].stock_quantity < cart.quantity) {
                            console.log("We have " + res[prod].stock_quantity + " in stock");
                        }
                        if ((res[prod].stock_quantity - cart.quantity) > 0) {
                            connection.query("UPDATE Products SET stock_quantity = " + (res[prod].stock_quantity - cart.quantity) +
                                " WHERE item_id = " + res[prod].item_id, function (err, res2) {
                                    if (err) throw err;
                                    //console.table(res2);
                                    connection.end()

                                });

                        }



                    })
                }
            }
        })

    });
    //reStart()

}

/*function reStart() {
    connection.query("SELECT * FROM products", function (err, res2) {
        if (err) throw err;
       // console.table(res2);
        inquirer.prompt([
            {
                type: "list",
                message: "Would you like to make an other purchase?",
                choices: ["yes", "no"]
            }
        ]).then(function (answer) {
            if (answer.choices === "yes") {
                console.log(answer.choices);
                //choosingProduct();
            }
            if (answer.choices === "no") {
                connection.end();
            }

        })
    })
}
reStart()*/
/*function purchase(){
    var total = cart.quantity * res[prod].price;
    console.log("You total is $" + total);
}*/

//

/*inquirer.prompt([{
    type: "list",
    message: "Would you like to buy them all?",
    choices:["Buy them all","Buy new quantity","Think  about it"]
}])*/