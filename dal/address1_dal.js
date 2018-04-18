var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM address1;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO address1(street, city, state, zip_code) VALUES (?, ?, ?, ?)';

    var queryData = [params.street, params.city, params.state, params.zip_code];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getinfo = function(address1_id, callback) {
    var query = 'CALL address1_getinfo(?)';
    var queryData = [address1_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};