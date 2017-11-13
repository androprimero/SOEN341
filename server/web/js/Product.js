//Class Item
function Item (Model_Number, Type,typeInt,category){
	this.Model_Number=Model_Number,
	this.Type = Type,
	this.typeInt = typeInt,
	this.category = category
}
//Class Product Specification
Item.Product_specification = function(Model_Number,Type,typeInt,category,price,weight,BrandName){
	Item.call(this, Model_Number, Type,typeInt,category),
	this.price=price,
	this.weight=weight,
	this.BrandName=BrandName
}
//Class Computer
Item.Product_specification.computer = function (Model_Number, Type,typeInt,category,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType){
	Item.Product_specification.call(this,Model_Number, Type,typeInt,category,price,weight,BrandName),
	this.HardDriveSize=HardDriveSize,
	this.RAM=RAM,
	this.CPUCores=CPUCores,
	this.dimension=dimension,
	this.ProcessorType=ProcessorType
}
//Class Desktop
function Desktop (Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType){
	Item.Product_specification.computer.call(this,Model_Number,"Desktop",1,"desktops",price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType),
	this.toWhereClauseValues = function(){
		var dimension = this.dimension.split("x");
		return "width = "+dimension[0]+" and height = "+dimension[1]+" and depth = "+dimension[2].substring(0,dimension[2].length-2)+" and weight = '"+this.weight+"' and processor  = '"+this.ProcessorType+"' and ram  = '"+this.RAM+"' and cpu_core = "+this.CPUCores+" and hard_drive_size = '"+this.HardDriveSize+"' and brand  ='"+this.BrandName+"' and price  = "+this.price;
	},
	this.getFields = function(){
		return "width,height,depth,weight,processor,ram,cpu_core,hard_drive_size,brand,price";
	},
	this.toInsertValues = function(){
		var dimension = this.dimension.split("x");
		return dimension[0]+", "+dimension[1]+", "+dimension[2].substring(0,dimension[2].length-2)+", '"+this.weight+"', '"+this.ProcessorType+"', '"+this.RAM+"', "+this.CPUCores+", '"+this.HardDriveSize+"', '"+this.BrandName+"', "+this.price;
	}
}
//Class Monitor
function Monitor (Model_Number, price,weight,BrandName,Size){
	Item.Product_specification.call(this,Model_Number,"Monitor",2,"monitors",price,weight,BrandName),
	this.Size = Size,
	this.toWhereClauseValues = function(){
		return " screen_size = "+this.Size+"  and weight = '"+this.weight+"' and brand  ='"+this.BrandName+"' and price  ="+this.price;
	},
	this.getFields=function(){
		return "screen_size,weight,brand,price";
	},
	this.toInsertValues=function(){
		return this.Size+", '"+this.weight+"', '"+this.BrandName+"', "+this.price;
	}
}
//Class laptop
function laptop (Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType,DisplaySize,BatteryInformation,OperativeSystem){
	Item.Product_specification.computer.call(this,Model_Number,"laptop",3,"laptops",price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType),
	this.DisplaySize=DisplaySize,
	this.BatteryInformation=BatteryInformation,
	this.OperativeSystem=OperativeSystem,
	this.toWhereClauseValues = function(){
		return " screen_size = "+this.DisplaySize+" and weight = '"+this.weight+"' and processor  = '"+this.ProcessorType+"' and ram  = '"+this.RAM+"' and cpu_core = "+this.CPUCores+" and hard_drive_size = '"+this.HardDriveSize+"' and battery ='"+this.BatteryInformation+"'  and brand  ='"+this.BrandName+"' and operating_system ='"+this.OperativeSystem+"' and price  ="+this.price;
	},
	this.getFields = function(){
		return "screen_size,weight,processor,ram,cpu_core,hard_drive_size,battery,brand,operating_system,price";
	},
	this.toInsertValues = function(){
		return this.DisplaySize+", '"+this.weight+"', '"+this.ProcessorType+"', '"+this.RAM+"', "+this.CPUCores+", '"+this.HardDriveSize+"', '"+this.BatteryInformation+"', '"+this.BrandName+"', '"+this.OperativeSystem+"', "+this.price;
	}
}
//Class Tablet
function Tablet(Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType,DisplaySize,BatteryInformation,OperativeSystem,CameraInformation){
	Item.Product_specification.computer.call(this,Model_Number,"Tablet",4,"tablets",price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType),
	this.DisplaySize=DisplaySize,
	this.BatteryInformation=BatteryInformation,
	this.OperativeSystem=OperativeSystem,
	this.CameraInformation=CameraInformation,
	this.toWhereClauseValues = function(){
		var dimension = this.dimension.split("x");
		//console.log(dimension);
		return " screen_size = "+this.DisplaySize+" and width = "+dimension[0]+" and height = "+dimension[1]+" and weight = '"+this.weight+"' and processor  = '"+this.ProcessorType+"' and ram  = '"+this.RAM+"' and cpu_core = "+this.CPUCores+" and hard_drive_size = '"+this.HardDriveSize+"' and battery ='"+this.BatteryInformation+"'  and brand  ='"+this.BrandName+"' and operating_system ='"+this.OperativeSystem+"' and camera ='"+this.CameraInformation+"' and price  ="+this.price+" and depth = "+dimension[2].substring(0,dimension[2].length-2);
	},
	this.getFields = function(){
		return "screen_size,weight,processor,ram,cpu_core,hard_drive_size,battery,brand,operating_system,price, camera,width,height,depth";
	},
	this.toInsertValues=function(){
		var dimension = this.dimension.split("x");
		return this.DisplaySize+",'"+this.weight+"', '"+this.ProcessorType+"', '"+this.RAM+"', "+this.CPUCores+", '"+this.HardDriveSize+"', '"+this.BatteryInformation+"', '"+this.BrandName+"', '"+this.OperativeSystem+"', "+this.price+",'"+this.CameraInformation+"',"+dimension[0]+","+dimension[1]+","+dimension[2].substring(0,dimension[2].length-2);
	}
}
Item.JSONToObject = function(objectJSON){
	switch(objectJSON.typeInt){
		case 1 : return new Desktop(objectJSON.Model_Number,objectJSON.price,objectJSON.weight,objectJSON.BrandName,objectJSON.HardDriveSize,objectJSON.RAM,objectJSON.CPUCores,objectJSON.dimension,objectJSON.ProcessorType);
		case 2 : return new Monitor(objectJSON.Model_Number,objectJSON.price,objectJSON.weight,objectJSON.BrandName,objectJSON.Size);
		case 3 : return new laptop(objectJSON.Model_Number,objectJSON.price,objectJSON.weight,objectJSON.BrandName,objectJSON.HardDriveSize,objectJSON.RAM,objectJSON.CPUCores,"N/A",objectJSON.ProcessorType,objectJSON.DisplaySize,objectJSON.BatteryInformation,objectJSON.OperativeSystem);
		case 4 : return new Tablet(objectJSON.Model_Number,objectJSON.price,objectJSON.weight,objectJSON.BrandName,objectJSON.HardDriveSize,objectJSON.RAM,objectJSON.CPUCores,objectJSON.dimension,objectJSON.ProcessorType,objectJSON.DisplaySize,objectJSON.BatteryInformation,objectJSON.OperativeSystem,objectJSON.CameraInformation) ;
	}
}
// module.exports = {
	// Monitor:Monitor,
	// Desktop:Desktop,
	// laptop:laptop,
	// Tablet:Tablet,
	// Item:Item
// };
