var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var AccountSchema=new Schema({
	id: String,
    accountnumber: String,
	name: String,
	phone: String,
	billingstreet: String,
	billingcity: String,
	billingstate: String,
	billingcountry: String,
	billingpostalcode: String
})

module.exports=mongoose.model('Account',AccountSchema);