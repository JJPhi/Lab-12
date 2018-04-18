var express = require('express');
var router = express.Router();
var info_dal = require('../dal/info_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
    info_dal.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('info/info_view_all', {info: result});
        }
    })
});

router.get('/add', function(req, res) {
    res.render('info/info_add');
});

router.get('/insert', function(req, res) {
    info_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/info/all');
        }
    });
});

module.exports = router;
