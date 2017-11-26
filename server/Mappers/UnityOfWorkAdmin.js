/**
 * UnityOfWorkAdmin save changes in Products
 */
var path = require('path');
var Product = require(path.join(__dirname, '..', 'Products/Product.js'));
var Mapperrs = require ('./Mapper.js');
var arrayDirty = [];
var arrayNew = [];
var arrayDeleted = [];
var Mapper;
function UnityOfWorkAdmin(given_mapper){
	Mapper = given_mapper;
}
UnityOfWorkAdmin.registerDirtyProduct = function(product){
	if(arrayDirty.length === 0){
		arrayDirty = new Array(product);
	}else{
		arrayDirty.push(product);
	}
};
UnityOfWorkAdmin.registerNewProduct = function(product){
	if(arrayNew.length === 0){
		arrayNew = new Array(product);
	}else{
		arrayNew.push(product);
	}
};
UnityOfWorkAdmin.registerDeletedProduct = function(model_number){
	if(arrayDeleted.length === 0){
		arrayDeleted = new Array(model_number);
	}else{
		arrayDeleted.push(model_number);
	}
};
UnityOfWorkAdmin.commit = function(fn){
	var i = 0;
	for( i = 0;i < arrayDirty.length;i++){
		Mapper.saveDirty(arrayDirty[i],function(result){
			console.log(result);
		});
	}
	for(i=0; i < arrayNew.length;i++){
		Mapper.saveNew(arrayNew[i],function(result){
			console.log(result);
		});
	}
	for(i=0; i < arrayDeleted.length;i++){
		Mapper.nowDeleteProduct(arrayDeleted[i],function(result){
			console.log(result);
		});
	}
	//clear the arrays after the tasks are done
	arrayDirty.splice(0,arrayDirty.length);
	arrayNew.splice(0,arrayNew.length);
	arrayDeleted.splice(0,arrayDeleted.length);
	fn(true)
};
UnityOfWorkAdmin.printArray=function(){
	console.log(arrayDirty);
	console.log("////")
	console.log(arrayNew);
	console.log("////")
	console.log(arrayDeleted);
}
module.exports = UnityOfWorkAdmin;