var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM parking;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO parking(parking_num, vehicle) VALUES (?, ?)';

    var queryData = [params.parking_num, params.vehicle];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};