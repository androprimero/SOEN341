var Product_specification = require("./Product_specification.js");
//Class Computer
function computer (Model_Number,Type,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType){
	Product_specification.call(this,Model_Number,Type,price,weight,BrandName),
	this.HardDriveSize=HardDriveSize,
	this.RAM=RAM,
	this.CPUCores=CPUCores,
	this.dimension=dimension,
	this.ProcessorType=ProcessorType
}
module.exports=computer;