// Class User
function User(IdNumber,FirstName,LastName,Address,EmailAddress,PhoneNumber,Password){
  this.Id = IdNumber;
  this.Name = FirstName;
  this.LastName = LastName;
  this.Password= Password;
  this.Address = Address;
  this.EmailAddress = EmailAddress;
  this.Phone = PhoneNumber;
  this.myWishlist = [];
}
module.exports = User;