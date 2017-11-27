//Enable Express Framework - Module
var express = require('express');
//Enable Postgress Connection - Module
var PGConnection = require('pg');
var bodyParser = require('body-parser');
var TableDataGateway = require('./Data_connection/TableDataGateway.js');
var IdentityMap = require('./Mappers/IdentityMapSingleton.js');
var UnitOfWorkAdmin = require('./Mappers/UnityOfWorkAdmin.js')
var UnitOfWorkWishlist = require('./Mappers/UnitOfWorkWishlistSingleton.js')
var Wishlist = require('./Mappers/Wishlist.js')
var Client = require('./Users/User.js')
var Mapper = require('./Mappers/Mapper.js');
var {Desktop, Monitor, laptop, Tablet,Item} = require('./Products/Product.js');
var path = require('path');
var app = express();app.use(bodyParser.urlencoded({ extended: true }));
var p= new Monitor("ERT124", 22,"1.5 kg","Asus",22);
//Create Connection to Postgress Database
//smapleTest
var conn = new PGConnection.Client({
		connectionString:"postgres://bccoxbtohkbpnf:b2fe7746edc73cff61b62b048b9be98007f910b8474cfc92b56648d571a8a40e@ec2-107-22-235-167.compute-1.amazonaws.com:5432/db7gah347b7r9s",
		ssl:true
	});
//static constructor
TableDataGateway(conn)
//getInstance of IdentityMap
var myIdentityMap = IdentityMap.getInstance();
UnitOfWorkAdmin(Mapper)
var myUnitOfWorkWishtlist=UnitOfWorkWishlist.getInstance();
myUnitOfWorkWishtlist.setMapper(Mapper)
var myWishlist = new Wishlist(Mapper.getClients_pool());
Mapper(TableDataGateway,myIdentityMap,UnitOfWorkAdmin,myWishlist,myUnitOfWorkWishtlist)
//create connection to database
Mapper.createDatabaseConnection();
//MAPPER TEST																									TEST
// TableDataGateway.login("me@ground.down", "legoo",function(user){
	// if(user!=null){
		// console.log(user)
	// }
	// else{
		// console.log("notot")
	// }
	
// })
// myW.printArray();
//Mapper.signIn("me@sky.up","element");
app.use(express.static(path.join(__dirname, 'web')));
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
			//console.log("AAAAAAAAAA");
			console.log(result);
			var el = JSON.stringify(result,null,"\t");
			//console.log("BBBBBBBBBB")
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
	Mapper.insertProduct(requestedProduct ,function(status){
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
app.post("/commitAdmin",function(req,res){
	res.setHeader("Content-Type","text/html");
	console.log("From Admin Commit");
	Mapper.commitAdmin(function (status){
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
//Login
app.post('/signin', function(req,res){
	res.setHeader("Content-Type","text/plain");
	var login = JSON.parse(req.body.data);
	myUsername= login.email;
	myPassword= login.pass;
	console.log(myUsername);
	console.log(myPassword);
	console.log("IN");
	Mapper.signIn(myUsername,myPassword, function(token){
		console.log(token)
		if(token != null){    
			res.status(200);
			console.log(token);
			res.end(token);
		}
		else{
			res.status(401);
			res.end("False");
		}
	});
});
app.post('/signout', function(req,res){
	res.setHeader("Content-Type","text/plain");
	myToken = req.body.token;
	console.log(myToken);
	Mapper.signOut(myToken, function(result){
		if(result){    
			res.status(200);
			res.end("Logout is Successful");
		}
		else{
			res.status(401);
			res.end("Unsuccessful Logout");
		}
	});
});
app.post("/getWishlist",function(req,res){
	res.setHeader("Content-Type","application/json");
	var token = req.body.data;
	console.log(req.body.data);
	var myUser=null;
	Mapper.verifyToken(token,function(user){
		if(user==null){
			res.status(401);
			var msg ={msg:"User Or Invalid Token"}
			res.end(JSON.stringify(msg,null,"\t"));
		}
		else{
			myUser=user;
			console.log(myUser);
		}
	})
	Mapper.getWishlist(myUser.Id,function(obj){
		if(obj){
			res.status(200);
			var data = {};
			data.rows=obj;
			res.end(JSON.stringify(data,null,"\t"));
		}
		else{
			res.status(401);
			res.end("{}",null,"\t");
		}
	})
})
app.post('/wishlistAdd', function(req,res){
	res.setHeader("Content-Type","text/plain");
	var data = JSON.parse(req.body.data);
	console.log(data);
	var product = Item.JSONToObject(data.p);
	var myUser =null
	Mapper.verifyToken(data.token,function(user){
		if(user==null){
			res.status(401);
			var msg ={msg:"User Or Invalid Token"}
			res.end(JSON.stringify(msg,null,"\t"));
			return;
		}
		else{
			myUser=user;
			console.log(myUser);
		}
	})
	// var userID = JSON.parse(req.body.data.userID);
	console.log(product);
	//myUser.myWishlist.push("OKay");
	//console.log(myUser.myWishlist);
	// console.log(userID);
	Mapper.insertToWishlist(myUser.Id,product, function(result){
		if(result){
			res.status(200);
			res.end("Item Added to the Wishlist");
		}
		else{
			res.status(400);
			res.end("Error while Adding the Item to the Wishlist");
		}
	});
});
app.post('/wishlistDelete', function(req,res){
	res.setHeader("Content-Type","application/json");
	var data = JSON.parse(req.body.data);
	console.log(data);
	var model_number = data.p;
	var myUser =null
	Mapper.verifyToken(data.token,function(user){
		if(user==null){
			res.status(401);
			var msg ={msg:"User Or Invalid Token"}
			res.end(JSON.stringify(msg,null,"\t"));
			return;
		}
		else{
			myUser=user;
			console.log(myUser);
		}
	})
	Mapper.removeFromWishlist(myUser.Id,model_number, function(result){
		if(result){
			res.status(200);
			console.log("going back")
			res.end(JSON.stringify(result,null,"\t"));
		}
		else{
			res.status(401);
			res.end(JSON.stringify("{}",null,"\t"));
		}
	});
});
app.post('/commitWishlist', function(req,res){
	res.setHeader("Content-Type","text/plain");
	var data = JSON.parse(req.body.data);
	var myUser=null
	Mapper.verifyToken(data.token,function(user){
		if(user==null){
			res.status(401);
			var msg ={msg:"User Or Invalid Token"}
			res.end(JSON.stringify(msg,null,"\t"));
			return;
		}
		else{
			myUser=user;
			
			console.log(myUser);
		}
	})
	Mapper.commitWishlist(myUser.Id, function(result){
		if(result){
			res.status(200);
			res.end("Item has been Deleted from Wishlist");
		}
		else{
			res.status(400);
			res.end("Error while Deleting the Item from the Wishlist");
		}
	});
});

app.listen(process.env.PORT || 3000);
