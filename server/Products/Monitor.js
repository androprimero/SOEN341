var Product_specification = require("./Product_specification.js");
//Class Monitor
function Monitor (Model_Number, price,weight,BrandName,Size){
	Product_specification.call(this,Model_Number,price,weight,BrandName),
	this.Size = Size
}
module.exports = Monitor;

