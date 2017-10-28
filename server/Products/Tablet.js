var computer = require('./computer.js');
//Class Tablet
function Tablet(Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType,DisplaySize,BatteryInformation,OperativeSystem,CameraInformation){
	computer.call(this,Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType),
	this.DisplaySize=DisplaySize,
	this.BatteryInformation=BatteryInformation,
	this.OperativeSystem=OperativeSystem,
	this.CameraInformation=CameraInformation
}
module.exports = Tablet;