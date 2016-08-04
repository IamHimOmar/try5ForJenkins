const bank = require('../api/bank');
const user = require('../api/user');

const middlewares = [user,bank[0]]; // bank[0] is used because in the bank.js we export an array, the one we need here is the router wihch is in the element 0;
module.exports = middlewares;
