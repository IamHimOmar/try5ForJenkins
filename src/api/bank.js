var express = require('express');
var router = express.Router();

var pg = require('pg');
var conString = function() {
    return process.env.NODE_ENV == "test" ? "postgres://omarmhadden:eal281095@localhost:5432/dumpdb":"postgres://omarmhadden:eal281095@localhost:5432/Omar";
}

router.post("/deposite",Deposite);
router.post("/withdraw",Withdraw);
router.get("/checkBalance",CheckBalance);
router.post("/transfer",Transfer);

function Deposite(req,res){
  var conn = conString();

  pg.connect(conn,function(err,client,done){
  var rows = [];
  var query = client.query("insert into testing.bank_transaction (transaction_date,description,balance,card_id) Values(now(),$1,$2,$3)",["desc","500","55"]);
      query.on('row',function(row){
        rows.push(row);
      })
      query.on('end',function(){
        res.json(rows);
        client.end();
      })
    });
}
function Withdraw(req,res){
  var conn = conString();

  pg.connect(conn,function(err,client,done){
  var rows = [];
  var query = client.query("insert into testing.bank_transaction (transaction_date,description,balance,card_id) Values(now(),$1,$2,$3)",["withdrawal","200","55"]);
      query.on('row',function(row){
        rows.push(row);
      })
      query.on('end',function(){
        res.json(rows);
        client.end();
      })
    });
}
function CheckBalance(req,res){
  var conn = conString();

  pg.connect(conn,function(err,client,done){
  var rows = [];
  var query = client.query("select balance from testing.bank_transaction where card_id = $1 LIMIT 1;",[55]);
      query.on('row',function(row){
        rows.push(row);
      })
      query.on('end',function(){
        res.json(rows);
        client.end();
      })
    });
}
function Transfer(req,res){
  var conn = conString();

  pg.connect(conn,function(err,client,done){
  var rows = [];
  client.query("insert into testing.bank_transaction (transaction_date,description,balance,card_id) Values(now(),$1,$2,$3)",["Transfered to 54","200","55"]);
  client.query("insert into testing.bank_transaction (transaction_date,description,balance,card_id) Values(now(),$1,$2,$3)",["recieved from 55","200","54"]);
  var query = client.query("select balance from testing.bank_transaction where card_id = $1;",[55]);
      query.on('row',function(row){
        rows.push(row);
      })
      query.on('end',function(){
        res.json(rows);
        client.end();
      })
    });
}
var x = function(){
  this.connectUser = function(card_id,obj,next){
    var conn = conString();
    pg.connect(conn,function(err,client,done){
    var rows = [];
    var query = client.query("select * from testing.bank_data where card_id = $1",[card_id]);
        query.on('row',function(row){
          rows.push(row);
        })
        query.on('end',function(){
          obj = rows;
          next(obj);
          client.end();
        })
      });
  }
}

const returned = [router,x];
module.exports = returned;
