var express = require('express');
var router = express.Router();
var parking_dal = require('../dal/parking_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
    parking_dal.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('parking/parking_view_all', {parking: result});
        }
    })
});

router.get('/add', function(req, res) {
    res.render('parking/parking_add');
});

router.get('/insert', function(req, res) {
    parking_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/parking/all');
        }
    });
});

module.exports = router;
