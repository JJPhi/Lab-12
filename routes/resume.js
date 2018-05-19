var express = require('express');
var router = express.Router();
var resume_dal = require('../dal/resume_dal');
var account_dal = require('../dal/account_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
    resume_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render('resume/resume_view_all', {result: result[0],
                was_successful_insert: req.query.was_successful_insert, was_successful_delete: req.query.   was_successful_delete});
        }
    });
});

router.get('/add', function(req, res) {
    resume_dal.getinfo(req.account_id, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/resume_add' , {account_id: res.req.query.account_id , resume: result, skill_result: result[0], school_result: result[1], company_result: result[2]} );
        }
    });
});

router.get('/add/select_user', function(req, res) {
    account_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/select_user' , {account_result: result});
        }
    });
});

router.get('/insert', function(req, res) {
    resume_dal.insert(req.query, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/resume/all' + "?&was_successful_insert=1");
        }
    });
});

router.get('/edit', function(req, res){
    resume_dal.getinfo(req.query.resume_id, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeUpdate',
                {account_id: res.req.query.account_id , resume: result, skill_result: result[0], school_result: result[1], company_result: result[2]}
            );
        }
    });
});

router.get('/update', function(req, res) {
    resume_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/resume/all');
        }
    });
});

router.get('/delete', function(req, res) {
    resume_dal.delete(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/resume/all' + "?&was_successful_delete=1");
        }
    });
});
module.exports = router;
