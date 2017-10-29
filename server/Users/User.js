// Class User
function User(IdNumber,FirstName,LastName,Address,EmailAddress,PhoneNumber){
  this.Id = IdNumber;
  this.Name = FirstName;
  this.LastName = LastName;
  this.Address = Address;
  this.EmailAddress = EmailAddress;
  this.Phone = PhoneNumber;
}
module.exports = User;