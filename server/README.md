# Understanding The Server Side Work Environment With Using Node.JS libraries

## Login Into The System

The login authentication is performed using the POST method at */authenticate* . The key,value needed are **email** with value *admin@store.com* and **password** with value *admin@store.com* . admin@store.com and admin@store.com is the email and password of the registered sample admin account which we are using to perform the insert item statement.

The 200, 400, and 401 are used to indicate the status of the request.

A JSON file is returned containing the token of a succesful login.

## Inserting an Item

Use the POST method containing the token in the body request with key name 'token' when performing an insert request.

Use asterick **\*** to specify an empty field i.e */item_insert/desktop/\*/\*/\*/\*/\*/\** . Inserting an item is done while providing a valid token with the correct privilege. A JSON file is returned regarding the execution of insert.

The properties: **:screen_size**, **:core**, **:camera** and  **:price** are in *decimal value*. The rest of the properties are *plain text*

### Inserting an Desktop item

url: **/item_insert/desktop/:processor/:ram/:cores/:hard_drive_size/:brand/:price** 

### Inserting an Monitor item

url: **/item_insert/monitor/:screen_size/:brand/:price**

### Inserting an Laptop item

url: **/item_insert/laptop/:screen_size/:processor/:ram/:cores/:hard_drive_size/:battery/:brand/:os/:price**

### Inserting an Tablet item

url: **/item_insert/tablet/:screen_size/:processor/:ram/:cores/:hard_drive_size/:battery/:brand/:os/:camera/:price**

## Logout of The System

Logout an account by simply calling */logout* . The current session of the account is erased. A JSON file is returned regarding the logout status.

## Fetching Items Using Get Method
Use asterick **\*** to chose from any available properties. i.e */0/10/laptop/\*/\*/\*/\*/\*/\*/\*/\*/\**

**:skip** : get items at the requested page. :skip is zero indexed - starting at 0

**:amountPerPage** : number of items per page,. i.e set to 10 to receive 10 items

**:orderBy** : order the result of mysql. Availaible properties
		*low_high_price* - price low to high, 
		*high_low_price* - price high to low, 
		*order_alpha* - alphabet order, 
		*reverse_order_alpha* reverse alphabet order

### Fetching **desktop** items
url: **/:skip/:amountPerPage/desktop/:processor/:ram/:cores/:hard_drive_size/:brand/:orderBy**

**:processor:** availaible properties 
		`desktop_processor=["AMD A4","AMD A6","AMD A8","AMD A10","AMD Athlon X4","AMD FX","Intel Pentium","Intel Xeon","Intel Core i3","Intel Core i5","Intel Core i7"]`
		`apple_laptop_desktop_processor=["Intel i3","Intel Core i5","Intel Core i7"]`

**:ram** : availaible properties
		`desktop_laptop_ram=["2 GB", "4 GB", "6 GB", "8 GB"]`

**:cores** : available properties
		`core=["2","4","6"];`
		
**:hard_drive_size** : available properties
		`laptop_desktop_hard_drive=["250 GB","500 GB","750 GB", "1 TB", "2 TB"];`

**:brand** : available properties
		`desktop=["Toshiba","Apple","IBM","Fujitsu","Sony","Dell","Acer","Lenovo","Compaq","HP","Gateway","Alienware","Sony","NEC","Asus","CybertronPC"]`

### Fetching monitor items
url: **/:skip/:amountPerPage/monitor/:screen_size/:brand/:orderBy**

**:screen_size** : available properties 
	`size_monitor=["17","19","22","23","24","27","28","29","32","34"];`

**:brand** : available properties
	`monitor=["Acer", "AOC", "Asus", "BenQ", "LG", "NEC", "Planar", "Samsung", "ViewSonic", "Sony","Sharp", "Philips", "3M", "Planar", "Gateway","Compaq"];`

### Fetching laptop items
url: **/:skip/:amountPerPage/laptop/:screen_size/:processor/:ram/:cores/:hard_drive_size/:battery/:brand/:os/:orderBy**

**:screen_size** : available properties 
	`size_laptop=["13.3","14","15","15.4","15.7","16"];`

**:processor** : availaible properties 
	`laptop_processor=["AMD A4","AMD A6","AMD A8","AMD A10","Intel Atom","Intel Celeron","Intel Pentium","Intel Core i3","Intel Core i5","Intel Core i7"];`
	`apple_laptop_desktop_processor=["Intel i3","Intel Core i5","Intel Core i7"];`

**:ram** : availaible properties
	`desktop_laptop_ram=["2 GB", "4 GB", "6 GB", "8 GB"];`

**:cores** : availaible properties
	`laptop_core=["1","2","4","6"];`
	`apple_laptop_core=["2","4","6"];`

**:hard_drive_size** : available properties
		`laptop_desktop_hard_drive=["250 GB","500 GB","750 GB", "1 TB", "2 TB"];`
		
**:battery** : available properties
	`laptop_battery=["40","45","50","60","65"]`
	
**:brand** : available properties
	`laptop=["Apple","Gateway","HCL","MSi","BenQ","HP","Samsung","Compaq","IBM","Sony","Dell","Lenovo","Toshiba","Fujitsu","LG","Wipro","Acer","Asus","Alienware"]`

**:os** : available properties
	`laptop_os=["Windows 10","Windows 8","Windows 7"];`
	`apple_laptop_os=["High Sierra 10.12", "El Capitan 10.11", "Yosemite 10.11", "Mavericks 10.9"];`

### Fetching tablet items
url: **/:skip/:amountPerPage/tablet/:screen_size/:processor/:ram/:cores/:hard_drive_size/:battery/:brand/:os/:camera/:orderBy**

**:screen_size** : available properties 
	`size_tablet=["5.1","8","9.7","10.1"];`

**:processor** : availaible properties 
	`tablet_processor=["Cortex A5","Cortex A8","Cortex A9","Cortex A12","Cortex A15","Cortex 17","Cortex A72","Intel Core i3","Intel Core i5","Intel Core i7","AMD A4","AMD A6","AMD A10"];`
	`apple_tablet_processor=["A10X","A8X","A5","A5X","A6X"];`

**:ram** : availaible properties
	`tablet_ram=["512 MB", "1 GB", "2 GB", "4 GB", "6 GB"];`
	`apple_tablet_ram=["2 GB", "4 GB"];`

**:cores** : availaible properties
	`tablet_core=["1","2","4","6"];`
	`apple_tablet_core=["2","4","6"];`

**:hard_drive_size** : available properties
		`tablet_hard_drive=["8 GB","16 GB","32 GB","64 GB"];`
		
**:battery** : available properties
	`tablet_battery=["30","35","40","50","60"];`
	
**:brand** : available properties
	`tablet=["Kindle", "Motorola","HP","Barnes and Noble","Samsung","Dell","RIM","Apple","Lenovo","Asus","Insignia","Polaroid","Huawei","LG"];`

**:os** : available properties
	`tablet_os=["Jelly Bean 4.1", "KitKat 4.4", "Lollipop 5.0", "Marshmallow 6.0","Nougat 7.0","Oreo 8.0"];`
	`apple_tablet_os=["iOS 11","iOS 10","iOS 9", "iOS 8"];`
	
**:camera** : available properties
	`tablet_camera=["6","8","12","14","16"];`

	
