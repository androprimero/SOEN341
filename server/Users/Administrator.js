var User = require('./User.js');
// Class Administrator
function Administrator(IdNumber,FirstName,LastName,Address,EmailAddress,PhoneNumber){
    User.call(this,IdNumber,FirstName,LastName,Address,EmailAddress,PhoneNumber);
    this.priviledges = true;
}
module.exports = Administrator;