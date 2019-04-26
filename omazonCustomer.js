//console.log("Hello")
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
  database: "bamazondb"
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  start();
});
function start(){
    //console.log("HELLO WORLD")
    connection.query("SELECT * FROM products",function(err,res){
        if (err) throw err;
        console.table(res);
        itemPrompt();
    } )
}
function itemPrompt(){
    inquirer.prompt([
        {
            type:"input",
            name:"items_id",
            message:"What is an Id # of the product?"
        }
    ]).then (function(data){
        //console.log(data.items_id);
        quantityPrompt(parseInt(data.items_id));

    })

}
//itemPrompt();
function quantityPrompt(product){
    inquirer.prompt([{
        type:"input",
        name:"quantity",
        message:"How many would you like?"
    }]).then (function(data){
        console.log(data.quantity);
    })
    
}

connection.query

