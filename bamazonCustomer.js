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
	});
}
