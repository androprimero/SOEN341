var computer = require('./computer.js');
//Class laptop
function laptop (Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType,DisplaySize,BatteryInformation,OperativeSystem){
	computer.call(this,Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType),
	this.DisplaySize=DisplaySize,
	this.BatteryInformation=BatteryInformation,
	this.OperativeSystem=OperativeSystem
}
module.exports = laptop;