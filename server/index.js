//Enable Express Framework - Module
var express = require('express');
//Enable Postgress Connection - Module
var PGConnection = require('pg');
var bodyParser = require('body-parser');
var TableDataGateway = require('./Data_connection/TableDataGateway.js');
var Mapper = require('./Mappers/Mapper.js');
var {Desktop, Monitor, laptop, Tablet,Item} = require('./Products/Product.js');
var path = require('path');
var app = express();app.use(bodyParser.urlencoded({ extended: true }));
//Create Connection to Postgress Database
var conn = new PGConnection.Client({
		connectionString:"postgres://bccoxbtohkbpnf:b2fe7746edc73cff61b62b048b9be98007f910b8474cfc92b56648d571a8a40e@ec2-107-22-235-167.compute-1.amazonaws.com:5432/db7gah347b7r9s",
		ssl:true
	});
//static constructor
TableDataGateway(conn)
Mapper(TableDataGateway,null,null)
//create connection to database
Mapper.createDatabaseConnection();
app.use(express.static(path.join(__dirname, 'Web')));
app.get("/Hello",function(req,res){
	res.setHeader("Content-Type","text/html");
	res.status(200);
	res.write("Team 1, 341 fall 2017 -- Sample Home Page <br>");
	TableDataGateway.test();
	res.end();
})
app.post("/get/:category",function(req,res){
	res.setHeader("Content-Type","application/json");
	var category = req.params.category;
	console.log("MIN")
	var prod = JSON.parse(req.body.data);
	console.log(prod.minSettings);
	console.log(category);
	Mapper.getCatalog(category, function(result){
		res.status(200);
		if(result){
			console.log("AAAAAAAAAA");
			console.log(result);
			var el = JSON.stringify(result,null,"\t");
			console.log("BBBBBBBBBB")
			console.log(el)
			//console.log(result);
			res.end(el);	
		}
		else{
			res.end("{}",null,"\t");
		}
	})
})
app.get("/verifyProduct/byModelNumber/:nm",function(req,res){
	console.log("requested Made");
	res.setHeader("Content-Type","application/json");
	Mapper.getInformationProduct(req.params.nm,function(obj){
		res.status(200);
		if(obj){
			res.end(JSON.stringify(obj,null,"\t"));
		}
		else{
			res.end("{}",null,"\t");
		}
	})
})
app.post("/insertProduct",function(req,res){
	res.setHeader("Content-Type","text/html");
	console.log(req.body.data);
	var prod = JSON.parse(req.body.data);
	console.log(prod);
	var requestedProduct = Item.JSONToObject(prod);
	console.log("aaaaaaaa"+requestedProduct);
	Mapper.saveNewProduct(requestedProduct ,function(status){
		if(status){
			res.status(200);
			res.end("OK")
		}
		else{
			res.status(400)
			res.end("Internal or Syntax Error")
		}
	})
})
app.post("/deleteProduct/byModelNumber/:nm",function(req,res){
	res.setHeader("Content-Type","text/html");
	Mapper.deleteProduct(req.params.nm,function(status){
		if(status){
			res.status(200);
			res.end("Ok")
		}
		else{
			res.status(404);
			res.end("Server or Not Found");
		}
	})
})
app.post("/updateProduct",function(req,res){
	res.setHeader("Content-Type","text/html");
	console.log(req.body.data);
	var prod = JSON.parse(req.body.data);
	console.log(prod);
	var requestedProduct = Item.JSONToObject(prod);
	console.log("aaaaaaaa"+requestedProduct);
	Mapper.updateProduct(requestedProduct ,function fn(status){
		if(status){
			res.status(200);
			res.end("OK")
		}
		else{
			res.status(400)
			res.end("Internal or Syntax Error")
		}
	})
})
app.listen(process.env.PORT || 3000);
