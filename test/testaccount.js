/*eslint-env node, mocha*/
var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();
var mongoose = require("mongoose");

var supertest = require("supertest");
var api = supertest("https://bluemixaccountsapi.au-syd.mybluemix.net/");

chai.use(chaiHttp);


describe("/accounts", function()  {
      it("Retrieved all account records successfully", function(done) {
        chai.request(server)
            .get("/accounts")
            .end(function(err, res){
        res.should.have.status(200);
		res.body.should.be.a('array');
		
 			done();
        });
  });

 it("Inserted the account details successfully", function(done) {
    chai.request(server )
      .post("/accounts")
      .send({
		    "_id": "63",
		    "id": "63",
		    "name": "Gurvinder Singh",
		    "accountnumber": "85334168123",
		    "phone": "8944551675",
		    "billingstreet": "Lal Marg",
		    "billingcity": "Chandigarh",
		    "billingstate": "Punjab",
		    "billingcountry": "India",
		    "billingpostalcode": "520015"
      })
      .end(function(err, res){
          res.should.have.status(200);
	     /* res.body.should.be.a('object');
	      res.body.should.have.property('id');
	      res.body.should.have.property('name');
		  res.body.should.have.property('accountnumber');
		  res.body.should.have.property('phone');
		  res.body.should.have.property('billingstreet');
		  res.body.should.have.property('billingcity');
		  res.body.should.have.property('billingstate');
		  res.body.should.have.property('billingcountry');
		  res.body.should.have.property('billingpostalcode');
       */
 	done();
        
                
          });    
      }); 	
  

      it("Retrieved the account details successfully based on the given id", function(done) {
        chai.request(server)
            .get("/accounts/1")
            .end(function(err, res){
        	//res.should.have.status(200);
			//res.body.should.be.a('array');
			 done();
        });
  });
     
 
 it('Updated the account details successfully based on the given id', function(done) {
  chai.request(server)
    .get('/accounts/6')
    .end(function(err, res){
      chai.request(server)
        .put('/accounts/63/')
        .send({
			    "phone": "8944551675",
			    "billingstreet": "Munjeru",
			    "billingcity": "Vizianagaram",
			    "billingstate": "AP",
			    "billingcountry": "India",
			    "billingpostalcode": "520015",
				"__v": 0
				})
		
        .end(function(error, response){
        
          done();
      });
    });
});

it('Deleted the account details successfully based on the given id', function(done) {
  chai.request(server)
    .get('/accounts/556')
    .end(function(err, res){
      chai.request(server)
        .delete('/accounts/6/')
        
        .end(function(error, response){
          
          done();
      });
    });
});


});

