process.env.NODE_ENV = 'test';
var mocha = require('mocha');
var expect  = require('chai').expect;
var chai = require('chai');
var superagent = require('superagent');
var chaiHttp = require('chai-http');
var assert = require('assert');
var request = require('request');
var server = require('../app.js')
var status = require('http-status');
var should = chai.should();
var exec = require('child_process').exec;


chai.use(chaiHttp);


//Create dump database for test with neccessary data for test.
function SetDB(done) {
  exec('createdb  dumpdb',function(err){
    if (err !== null) {
      console.log('exec error' + err);
    }
    exec('psql -d dumpdb -f testdb.sql',function(err){
      if (err !== null) {
        console.log('exec error' + err);
      }
      done();
    });
  });
}
function FillDB(done){
  exec('psql -d dumpdb -f insertdata.sql',function(err){
    if (err !== null) {
      console.log('exec error' + err);
    }
    done();
  })
}
function ClearDB(done){
  exec('psql -d dumpdb -f cleardata.sql',function(err){
    if (err !== null) {
      console.log('exec error' + err);
    }
    done();
  })
}
//Drop dump database for test
function DropDB() {

  exec('psql -d postgres -U postgres -f dropdb.sql',function(err){
    if (err !== null) {
      console.log('exec error' + err);
    }
  });
}

describe('test crud', function() {
  before(function(done){
    SetDB(done);
  });
  beforeEach(function(done){
    FillDB(done);
  });
  afterEach(function(done){
    ClearDB(done);
  });
  after(function(done){
    DropDB();
    this.timeout(2200);
    setTimeout(done, 2100);    //droppin db apparently takes sometime, thus the timeout had to be set to more than 2000ms
  });
  it('post user POST/user', done => {
    chai.request(server)
      .post("/user")
      .send({'name': 'Name From Test Post Method'})
      .end(function(err,res){
        chai.request(server)
          .get("/user/Name From Test Post Method")
          .end(function (err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].name.should.equal("Name From Test Post Method");
            done();
          });
      });
  });
    it('get users GET/users', function(done){
        chai.request(server)
          .get('/users')
          .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an("array");
            res.body.length.should.equal(1);
            done();
          });
    });
    it('get single user GET/user/:id', function(done){
        chai.request(server)
          .get("/user/" + "Name From Test")
          .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].name.should.equal("Name From Test");
            expect(res.body[1]).to.be.equal(undefined);
            done();
          })
    });
    it('update user PUT/user/:id', function(done){
      chai.request(server)
        .put("/user/" + "Name From Test")
        .send({'name': 'New Name From Test PUT'})
        .end(function(err,res){
          chai.request(server)
            .get("/user/New Name From Test PUT")
            .end(function(err,res){
              res.should.have.status(200);
              res.should.be.json;
              res.body.length.should.equal(1);
              res.body[0].name.should.equal("New Name From Test PUT");
            })
          done();
        });
    });
    it('delete user DELETE/user', function(done){
      chai.request(server)
        .delete("/user/" + "Name From Test")
        .end(function(err,res){
          chai.request(server)
          .get("/users")
          .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.length.should.equal(0);
          })
          done();
        });
    });
});
