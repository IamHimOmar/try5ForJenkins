const bank = require('./src/api/bank');


function Person() {
    this.Login = function(){
      bnk = new bank[1]();
      var obj;
      bnk.connectUser(55,obj,function(objc){
          console.log(objc);
      });
    }
}

var p = new Person();
p.Login();
