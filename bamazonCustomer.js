var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection ({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Zzxc12asd!!",
	database: "bamazon_db"
	});

connection.connect(function(err) {
	if (err) throw err;
	listProducts();
	});


var listProducts = function() {
	var query = "SELECT * FROM products"
	connection.query(query, function(err,res) {
		for(var i = 0; i < res.length; i++) {
			console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name)
		}
		shoppingCart();
	});
}

var shoppingCart = function() {
	inquirer.prompt([{
		name: "ProductID",
		type: "input",
		message: "What is the ID of the product you would like to buy?",
	}, {
		name: "Quantity",
		type: "input",
		message: "How many would you like to buy?",
	}]).then(function(answer) {
		var query = "SELECT * FROM products WHERE item_id" + answer.Quantity;
		connection.query(query, function(err, res) {
			if(answer.Quantity <= res) {
				for (var i = 0; i < res.length; i++) {
					console.log("We currently have " + res[i].stock_quantity + " " + res[i].product_name + ".");
					console.log("Thank you for your purchase!  Your order of "+ res[i].stock_quantity + " " + res[i].product_name + " is now being fulfilled.");
				}
			} else {
				console.log("We are currently out of stock of this product.");
			}
		})
	})
};
