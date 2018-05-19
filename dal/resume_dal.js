var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'CALL resume_getall();';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO resume (account_id, resume_name) VALUES(?, ?)';

    var queryData = [params.account_id, params.resume_name];

    connection.query(query, queryData, function(err, result) {
        if (err || params.skill_id === undefined) {
            callback(err, result);
            if (err || params.school_id === undefined) {
                callback(err, result);
                if (err || params.company_id === undefined) {
                    callback(err, result);
                } else {

                    var resume_id = result.insertId;
                }
            }
        }
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE resume SET resume_name = ? WHERE resume_id = ?';

    var queryData = [params.resume_name, params.resume_id];

    connection.query(query, queryData, function(err, result) {
        resumeSkillUpdate(params.resume_id, params.skill_id, function(err, result) {
            callback(err, result);
        });
            resumeSchoolUpdate(params.resume_id, params.school_id, function(err, result) {
                callback(err, result);
            });
                resumeCompanyUpdate(params.resume_id, params.company_id, function(err, result) {
                    callback(err, result);
                });
    });
};

exports.getinfo = function(account_id, callback) {
    var query = 'CALL resume_get(?)';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(params, callback) {
    var query = 'DELETE FROM resume WHERE resume_id = ?';

    var queryData = [params.resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

var resumeSkillInsert = function (resume_id, skillIdArray, callback) {

    var query = 'INSERT INTO resume_skill (skill_id, resume_id) VALUES ?';

    var resumeSkillData = [];

    if (skillIdArray.constructor === Array) {

        for (var i = 0; i < skillIdArray.length; i++) {
            resumeSkillData.push(
                [resume_id, skillIdArray[i]]
            );
        }
    }
    else {
        resumeSkillData.push([resume_id, skillIdArray]);
    }

    connection.query(query, [resumeSkillData],
        function (err, result) {
            callback(err, result);
        });
};

var resumeSchoolInsert = function (resume_id, schoolIdArray, callback) {

    var query = 'INSERT INTO resume_school (school_id, resume_id) VALUES ?';

    var resumeSchoolData = [];

    if (schoolIdArray.constructor === Array) {

        for (var i = 0; i < schoolIdArray.length; i++) {
            resumeSchoolData.push(
                [resume_id, schoolIdArray[i]]
            );
        }
    }
    else {
        resumeSchoolData.push([resume_id, schoolIdArray]);
    }

    connection.query(query, [resumeSchoolData],
        function (err, result) {
            callback(err, result);
        });
};

var resumeCompanyInsert = function (resume_id, companyIdArray, callback) {

    var query = 'INSERT INTO resume_company (company_id, resume_id) VALUES ?';

    var resumeCompanyData = [];

    if (companyIdArray.constructor === Array) {

        for (var i = 0; i < companyIdArray.length; i++) {
            resumeCompanyData.push(
                [resume_id, CompanyIdArray[i]]
            );
        }
    }
    else {
        resumeCompanyData.push([resume_id, companyIdArray]);
    }

    connection.query(query, [resumeCompanyData],
        function (err, result) {
            callback(err, result);
        });
};

var resumeSkillUpdate = function(resume_id, skillIdArray, callback){

    var query = 'CALL resume_skill_delete(?)';

    connection.query(query, resume_id, function (err, result) {
        if(err || skillIdArray === undefined) {

            callback(err, result);
        } else {
            resumeSkillInsert(resume_id, skillIdArray, callback);
        }
    });
};

var resumeSchoolUpdate = function(resume_id, schoolIdArray, callback){

    var query = 'CALL resume_school_delete(?)';

    connection.query(query, resume_id, function (err, result) {
        if(err || schoolIdArray === undefined) {

            callback(err, result);
        } else {
            resumeSchoolInsert(resume_id, schoolIdArray, callback);
        }
    });
};

var resumeCompanyUpdate = function(resume_id, companyIdArray, callback){

    var query = 'CALL resume_company_delete(?)';

    connection.query(query, resume_id, function (err, result) {
        if(err || companyIdArray === undefined) {

            callback(err, result);
        } else {
            resumeCompanyInsert(resume_id, companyIdArray, callback);
        }
    });
};
