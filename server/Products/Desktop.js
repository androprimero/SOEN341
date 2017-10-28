var computer = require("./computer.js");
//Class Desktop
function Desktop (Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType){
	computer.call(this,Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType);
}
module.exports=Desktop;