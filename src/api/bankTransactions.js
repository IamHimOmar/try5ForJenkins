var express = require('express');
var router = express.Router();

var pg = require('pg');

var conString = function() {
    return process.env.NODE_ENV == "test" ? "postgres://omarmhadden:eal281095@localhost:5432/dumpdb":"postgres://omarmhadden:eal281095@localhost:5432/Omar";
}
