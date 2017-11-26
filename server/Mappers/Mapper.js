var path = require('path');
var jwt = require('jsonwebtoken');
var {Desktop, Monitor, laptop, Tablet} = require(path.join(__dirname, '..', 'Products/Product.js'));
var Client = require(path.join(__dirname, '..', 'Users/User.js'))
var clients_pool = []
//class Mapper
function Mapper (given_tableDataGateway, given_identityMap,given_unitOfWorkAdmin, given_wishlist, given_UnitOfWorkWishlist){
	TableDataGateway = given_tableDataGateway,
	IdentityMap = given_identityMap,
	UnitOfWorkAdmin = given_unitOfWorkAdmin,
	Wishlist = given_wishlist;
	UnitOfWorkWishlist = given_UnitOfWorkWishlist
}
Mapper.getClients_pool=function(){
	return clients_pool;
}
Mapper.saveWislistNew = function (id,insert, fn){
	console.log(insert.length)
	// if(insert.length>0){
		TableDataGateway.saveWislistNew(id,insert,function(res){
			fn(res);
		})	
	// }
	// else{
		// fn(true);
	// }
}
Mapper.deleteWishlistProduct = function (id,remove, fn){
	// if(remove.length>0){
		console.log("AAAAAAAAAAAAAAAAAAA")
		TableDataGateway.deleteWishlistProduct(id,remove,function(res){
			fn(res);
		})
	// }
	// else{
		// fn(true);
	// }
}
Mapper.addClient=function (c){
	clients_pool.push(c);
	UnitOfWorkWishlist.addClient(c.Id)
}
function verify (token) {
	var success;
	jwt.verify(myToken,'soen341fall2017',function(err, decoded){
		if(err){
			sucess=null;
			console.log("unsuccessful logout");
		}
		else{
			sucess = decoded;
			console.log(decoded);
		}
	});
	return sucess;
}
//static methods
Mapper.createDatabaseConnection=function(){
	TableDataGateway.connect();
}
//VerifyProduct
Mapper.getInformationProduct=function(model_number,fn){
	var product = IdentityMap.findProduct(model_number);
	if(product==null){
		console.log("TDG")
		TableDataGateway.informationProduct(model_number,function(obj){
			console.log("TDG");
			console.log(obj)
			if(obj!=null){
				IdentityMap.addProduct(obj)
			}
			fn(obj)
		})
	}
	else{
		fn(product)
	}
}
Mapper.getCatalog=function(category,fn){
	TableDataGateway.getCatalog(category,function(result){
		fn(result);
	})
}
//Insertion
Mapper.insertProduct=function(product,fn){
	IdentityMap.addProduct(product);
	UnitOfWorkAdmin.registerNewProduct(product);
	fn(true);
}
Mapper.saveNew= function(product,fn){
	TableDataGateway.saveNewProduct	(product,function(result){
		fn(result);
	})
}
//Deletion
Mapper.deleteProduct=function(model_number,fn){
	IdentityMap.deleteProduct(model_number);
	UnitOfWorkAdmin.registerDeletedProduct(model_number);
	fn(true);
}
Mapper.nowDeleteProduct=function(model_number,fn){
	TableDataGateway.deleteProduct(model_number,function(status){
		fn(status);
	})
}
//Update
Mapper.updateProduct = function(product,fn){
	IdentityMap.updateProduct(product);
	UnitOfWorkAdmin.registerDirtyProduct(product);
	fn(true)
}
Mapper.saveDirty=function(product,fn){
	TableDataGateway.updateProduct(product,function(status){
		fn(status)
	})
}
Mapper.commitAdmin=function(fn){
	UnitOfWorkAdmin.commit(function(result){
		fn(result)
	})
}
Mapper.commitWishlist = function(userID,fn){
	UnitOfWorkWishlist.commitWishlist(userID,function(res){
		fn(res)
	});
}
Mapper.insertToWishlist = function(userID,product){
	Wishlist.addToWishlist(userID,product);	
	UnitOfWorkWishlist.registerNewWishlist(userID,product.Model_Number);
	UnitOfWorkWishlist.printArray();
	
}
Mapper.removeFromWishlist = function(userID,model_number){
	Wishlist.deleteFromWishlist(userID,model_number);	
	UnitOfWorkWishlist.registerDelete(userID,model_number);
	UnitOfWorkWishlist.printArray();
}
Mapper.signUp = function(myUsername,myPassword,myFirstName,myLastName,myAdress,myEmail,myPhoneNumber,fn){
	
}
Mapper.signIn = function (myUsername, myPassword, fn) {
	if(myPassword=="password"){
		jwt.sign({username: myUsername, password: myPassword}, 'soen341fall2017', function (err,token){
			if(err){
				console.log(err);
				fn(null);
			}
			else{
				fn(token);
			}
		});
	}
	else{
		fn(null)
	}
}
Mapper.signOut = function (token, fn) {
	if(verify(token) != null){
		fn(true);
	}
	else{
		fn(false);	
	}
}
module.exports = Mapper;
