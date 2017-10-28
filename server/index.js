var express = require('express');
var app = express();
//Product Specification
var Product_specification = require('./Products/Product_specification.js');
var product = new Product_specification("Product_spec","a","b","c");
console.log(product.Model_Number);
//Monitor
var Monitor = require('./Products/Monitor.js');
var monitor = new Monitor("Monitor","1","2","3","4");
console.log(monitor.Model_Number);
//Desktop
var Desktop = require('./Products/Desktop.js');
var desktop = new Desktop("Desktop","1","2","3","4","5","6","7","8");
console.log(desktop.Model_Number);
//laptop
var Laptop= require("./Products/laptop.js");
var laptop = new Laptop("Laptop","1","2","3","4","5","6","7","8","9","10","11");
console.log(laptop.Model_Number);
console.log(laptop.BatteryInformation);
//Tablet
var Tablet = require('./Products/Tablet.js');
var tablet = new Tablet("Tablet","1","2","3","4","5","6","7","8","9","10","11","12");
console.log(tablet.Model_Number);
console.log(tablet.CameraInformation)


app.get("/",function(req,res){
	res.send("Team 1, 341 fall 2017 -- Sample Home Page");
})

app.listen(process.env.PORT || 3000);