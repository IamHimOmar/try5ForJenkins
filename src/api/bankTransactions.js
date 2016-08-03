var express = require('express');
var router = express.Router();

var pg = require('pg');

var conString = function() {
    return process.env.NODE_ENV == "test" ? "postgres://omarmhadden:eal281095@localhost:5432/dumpdb":"postgres://omarmhadden:eal281095@localhost:5432/Omar";
}

router.post("/user",Withdraw(req,res));


function Withdraw(req,res){
  //requires amount, description, date, account id
    var conn = conString();
    pg.connect(conn,function(err,client,done){
      client.query("ALTER testing.bank_balance (amount,date) values ((amount - $1),now())",[amount]);
      var query = client.query("INSERT INTO testing.bank_transaction (name) VALUES ($1)",[req.body.name]);
      query.on('end',function(){
          res.json({name:req.body.name});
      });
    }
}

function Deposite(){
  //requires amount, description, date
}

function Transfer(){
  //requires amount, description, date, account tranfered to
}
function OnlinePayment(){
  //requires amount, description, date
}
