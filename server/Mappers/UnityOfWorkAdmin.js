/**
 * UnityOfWorkAdmin save changes in Products
 */
var path = require('path');
var Product = require(path.join(__dirname, '..', 'Products/Product.js'));
var Mapper = require ('./Mapper.js');
var arrayDirty = [];
var arrayNew = [];
var arrayDeleted = [];
var mapper;
function UnityOfWorkAdmin(given_mapper){
	mapper = given_mapper;
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
UnityOfWorkAdmin.registerDeletedProduct = function(product){
	if(arrayDeleted.length === 0){
		arrayDeleted = new Array(product);
	}else{
		arrayDeleted.push(product);
	}
};
UnityOfWorkAdmin.commit = function(){
	var i = 0;
	for( i = 0;i < arrayDirty.length;i++){
		Mapper.saveDirty(arrayDirty[i]);
	}
	for(i=0; i < arrayNew.length;i++){
		Mapper.saveNew(arrayNew[i]);
	}
	for(i=0; i < arrayDeleted.length;i++){
		Mapper.deleteProduct(arrayDeleted[i]);
	}
	//clear the arrays after the tasks are done
	arrayDirty.splice(0,arrayDirty.length);
	arrayNew.splice(0,arrayNew.length);
	arrayDeleted.splice(0,arrayDeleted.length);
};
module.exports = UnityOfWorkAdmin;