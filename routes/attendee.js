var express = require('express');
var router = express.Router();
var attendee_dal = require('../dal/attendee_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
    attendee_dal.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('attendee/attendee_view_all', {attendee: result});
        }
    })
});

router.get('/add', function(req, res) {
    res.render('attendee/attendee_add');
});

router.get('/insert', function(req, res) {
    attendee_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/attendee/all');
        }
    });
});

module.exports = router;
