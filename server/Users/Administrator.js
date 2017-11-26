var User = require('./User.js');
// Class Administrator
function Administrator(IdNumber,FirstName,LastName,Address,EmailAddress,PhoneNumber,Password){
    User.call(this,IdNumber,FirstName,LastName,Address,EmailAddress,PhoneNumber,Password);
    this.priviledges = true;
}
module.exports = Administrator;