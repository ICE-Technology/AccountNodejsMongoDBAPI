var express=require('express');
var app=express();
//var path=require('path');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var Account=require('./Account.model');

var PORT = (process.env.VCAP_APP_PORT || 8080);

var host=(process.env.VCAP_APP_HOST || 'localhost');

var db='mongodb://kusumagorle:kusuma123@ds151909.mlab.com:51909/iceteam';

mongoose.connect(db);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended:true
}));

app.get('/',function(req,res){
	res.send("Hello!! Please use /accounts for GET and POST (or) /accounts/:accid for GetById, PUT and DELETE!");
	//res.sendFile(path.join(__dirname + '/login.html'));
});


app.get('/accounts',function(req,res){
	console.log('Getting All Account Details!');
	Account.find({})
	.exec(function(err, accounts){
		if(err){
			res.send('Error has occured!');
		} else {
			console.log(accounts);
			res.json(accounts);
		}
	})
});

app.get('/accounts/:accountnumber',function(req,res){
	console.log('Getting account Details');
	Account.findOne({
		accountnumber:req.params.accountnumber
	})
	.exec(function(err,account){
		if(err){
			res.send('Error Occured!');
		} else{
			console.log(account);
			res.json(account);
		}
	}) 
})

app.post('/accounts',function(req,res){
	var newAccount=new Account();
	
	newAccount.id=req.body.id;
	newAccount.accountnumber=req.body.accountnumber;
	newAccount.name=req.body.name;
	newAccount.phone=req.body.phone;
	newAccount.billingstreet=req.body.billingstreet;
	newAccount.billingcity=req.body.billingcity;
	newAccount.billingstate=req.body.billingstate;
	newAccount.billingcountry=req.body.billingcountry;
	newAccount.billingpostalcode=req.body.billingpostalcode;
	
	newAccount.save(function(err,account){
	if(err){
		res.send('Error while placing account!');
	} else{
		console.log(account);
		res.send(account);
	}
	});
});


app.put('/accounts/:accountnumber',function(req,res){
	Account.findOneAndUpdate({
		accountnumber:req.params.accountnumber
	},
	{$set:{name:req.body.name}},
		{upsert:true},
		function(err,newAccount){
			if(err){
				console.log('Error has occured while updating account Details!');
			} else{
				console.log(newAccount);
				res.send(newAccount);
			}
		});
});

app.delete('/accounts/:accountnumber',function(req,res){
	Account.findOneAndRemove({
		accountnumber:req.params.accountnumber
	}, function(err,account){
		if(err){
			res.send('Error while deleting Account Details!');
		} else{
			console.log(account);
			res.status(204);
		}
	});
});

app.listen(8080,function () {
  console.log('Example app listening on port 8080!');
});

module.exports = app; // for testing