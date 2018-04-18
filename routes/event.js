var express = require('express');
var router = express.Router();
var event_dal = require('../dal/event_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
    event_dal.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('event/event_view_all', {event: result});
        }
    })
});

router.get('/add', function(req, res) {
    res.render('event/event_add');
});

router.get('/insert', function(req, res) {
    event_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/event/all');
        }
    });
});

module.exports = router;
