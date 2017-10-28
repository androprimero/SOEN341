# Using The Products Package

  The package is used to instanciate products object necessary to store in the database.
  
### Creating a Desktop Object

  **Add the class** Desktop using
  
  `var Desktop = require('./Products/Desktop.js')`
  
  **Instanciate** a Desktop with arguments using 
  
  `var myDesktop = new Desktop(Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType)`
 
### Creating a Monitor Object
 
  **Add the class** Monitor using
  
  `var Monitor = require('./Products/Monitor.js')`
  
  **Instanciate** a Monitor with arguments using 
  
  `var myMonitor = new Monitor(Model_Number, price,weight,BrandName,Size)`

### Creating a Laptop Object Object
  
  **Add the class** laptop using 
  
  `var laptop = require(./Products/laptop.js)`
  
  **Instanciate** a laptop with argument using 
  
  `var myLaptop = new laptop('Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType,DisplaySize,BatteryInformation,OperativeSystem')`
  
 ### Creating a Tablet Object
 
  **Add the class** Tablet using 
  
  `var Tablet = require('./Products/Tablet.js')`
  
  **Instanciate** a Tablet with arguments using 
  
  `var myTablet = new Tablet(Model_Number,price,weight,BrandName,HardDriveSize,RAM,CPUCores,dimension,ProcessorType,DisplaySize,BatteryInformation,OperativeSystem,CameraInformation)`
