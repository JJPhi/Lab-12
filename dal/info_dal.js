var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM info;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO info(allowed, denied) VALUES (?, ?)';

    var queryData = [params.allowed, params.denied];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};