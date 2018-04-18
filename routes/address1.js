var express = require('express');
var router = express.Router();
var address1_dal = require('../dal/address1_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
    address1_dal.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('address1/address1_view_all', {address1: result});
        }
    })
});

router.get('/add', function(req, res) {
    res.render('address1/address1_add');
});

router.get('/insert', function(req, res) {
    address1_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/address1/all');
        }
    });
});

module.exports = router;
