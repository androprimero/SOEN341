var path = require('path');
var {Desktop, Monitor, laptop, Tablet} = require(path.join(__dirname, '..', 'Products/Product.js'));
//class Mapper
function Mapper (given_tableDataGateway, given_identityMap,given_unitOfWorkAmin){
	TableDataGateway = given_tableDataGateway,
	identityMap = given_identityMap,
	unitOfWorkAmin = given_identityMap
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
module.exports = Mapper;