var path = require('path');
var jwt = require('jsonwebtoken');
var {Desktop, Monitor, laptop, Tablet} = require(path.join(__dirname, '..', 'Products/Product.js'));
//class Mapper
function Mapper (given_tableDataGateway, given_identityMap,given_unitOfWorkAmin){
	TableDataGateway = given_tableDataGateway,
	identityMap = given_identityMap,
	unitOfWorkAmin = given_identityMap
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
Mapper.getInformationProduct=function(model_number,fn){
	TableDataGateway.informationProduct(model_number,function(obj){
		fn(obj)
	})
}
Mapper.getCatalog=function(category,fn){
	TableDataGateway.getCatalog(category,function(result){
		fn(result);
	})
}
Mapper.saveNewProduct=function(product,fn){
	TableDataGateway.saveNewProduct(product,function(result){
		fn(result);
	})
}
Mapper.deleteProduct=function(model_number,fn){
	TableDataGateway.deleteProduct(model_number,function(status){
		fn(status);
	})
}
Mapper.updateProduct = function(product,fn){
	TableDataGateway.updateProduct(product,function(status){
		fn(status)
	})
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


