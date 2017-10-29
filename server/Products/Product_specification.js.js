var Item = require('./Item.js');
//Class Product_specification
function Product_specification(Model_Name,Type,price,weight,BrandName){
	Item.call(this, Model_Name, Type),
	this.price=price,
	this.weight=weight,
	this.BrandName=BrandName
}
module.exports = Product_specification;