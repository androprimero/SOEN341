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
//static methods
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
function verify (myToken) {
	var success;
	jwt.verify(myToken,'soen341fall2017',function(err, decoded){
		if(err){
			success=null;
		}
		else{
			success = decoded;
			//console.log(decoded);
		}
	});
	return success;
}
Mapper.verifyToken=function(token,fn){
	var myToken = verify(token);
	console.log(token);
	fn(myToken);
}
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
		UnitOfWorkWishlist.printArray();
		fn(res)
	});
}
Mapper.getWishlist = function(userID,fn){
	var found = Wishlist.find(userID)
	if(found!=null){
		//console.log("FOUND")
		fn(found.myWishlist);
	}
	else{
		fn(null)
	}
}
Mapper.insertToWishlist = function(userID,product,fn){
	var res = Wishlist.addToWishlist(userID,product);	
	UnitOfWorkWishlist.registerNewWishlist(userID,product.Model_Number);
	Wishlist.printArray();
	UnitOfWorkWishlist.printArray();
	fn(res)
	
}
Mapper.removeFromWishlist = function(userID,model_number,fn){
	var res = Wishlist.deleteFromWishlist(userID,model_number);	
	UnitOfWorkWishlist.registerDelete(userID,model_number);
	UnitOfWorkWishlist.printArray();
	fn(res)
}
Mapper.signUp = function(myUsername,myPassword,myFirstName,myLastName,myAdress,myEmail,myPhoneNumber,fn){
	
}
Mapper.signIn = function (email, myPassword, fn) {
	//perform Sign in using TDG
	TableDataGateway.login(email, myPassword,function(user,admin){
		if(user!=null){
			console.log(user)
			if(!admin){
				var found = Wishlist.find(user.Id)
				if(found==null){
					//add Client to Wishlist and UnityOfWorkWishlist
					Mapper.addClient(user)
					console.log("Client Added to Pool")
					Wishlist.printArray();
					UnitOfWorkWishlist.printArray();
					//Add Wishlist List To Client
					TableDataGateway.getWishlist(user.Id,function(result){
						if(result!=null){
							console.log(result);
							for(var i=0; i<result.length;i++){
								TableDataGateway.informationProduct(result[i].model_number,function(product){
									user.myWishlist.push(product)
									console.log("retrieved for user id "+user.Id +" product "+product.Model_Number+" and added to Wishlist")
								})
							}
						}
						else{
							console.log("wishlistError");
						}
					})
				}
			}
			jwt.sign(JSON.stringify(user), 'soen341fall2017', function (err,token){
				if(err){
					//console.log(err);
					console.log(err);
					fn(null);
				}
				else{
					console.log(token);
					if(admin){
						fn(token+" true")
					}
					else{
						fn(token+" false")	
					}
				}
			});
		}
		else{
			console.log("FALSE--")
			fn(null);
		}
		
	})
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
