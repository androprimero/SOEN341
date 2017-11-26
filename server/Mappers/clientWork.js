// Class User
function clientWork(Id){
	this.Id = Id;
	this.insert = [];
	this.remove_ = [];
	this.add=function(p){
		this.insert.push(p)
	}
	this.remove=function(p){
		this.remove_.push(p)
	}
}
module.exports = clientWork;