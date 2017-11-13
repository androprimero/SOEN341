function Item (Model_Number, Type){
	this.Model_Number=Model_Number,
	this.Type = Type
}

function Product_specification(Model_Name,Type,price,weight,BrandName){
	Item.call(this, Model_Name, Type),
	this.price=price,
	this.weight=weight,
	this.BrandName=BrandName
}

function computer (Model_Number,Type,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType){
	Product_specification.call(this,Model_Number,Type,price,weight,BrandName),
	this.HardDriveSize=HardDriveSize,
	this.RAM=RAM,
	this.CPUCores=CPUCores,
	this.dimension=dimension,
	this.ProcessorType=ProcessorType
}

function laptop (Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType,DisplaySize,BatteryInformation,OperativeSystem){
	computer.call(this,Model_Number,"laptop",price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType),
	this.DisplaySize=DisplaySize,
	this.BatteryInformation=BatteryInformation,
	this.OperativeSystem=OperativeSystem
}

function Desktop (Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType){
	computer.call(this,Model_Number,"Desktop",price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType);
}

function Monitor (Model_Number, price,weight,BrandName,Size){
	Product_specification.call(this,Model_Number,"Monitor",price,weight,BrandName),
	this.Size = Size
}

function Tablet(Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType,DisplaySize,BatteryInformation,OperativeSystem,CameraInformation){
	computer.call(this,Model_Number,"Tablet",price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType),
	this.DisplaySize=DisplaySize,
	this.BatteryInformation=BatteryInformation,
	this.OperativeSystem=OperativeSystem,
	this.CameraInformation=CameraInformation
}

