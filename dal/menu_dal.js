var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM menu;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO menu(food, beverage, price) VALUES (?, ?, ?)';

    var queryData = [params.food, params.beverage, params.price];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};