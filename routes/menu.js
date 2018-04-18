var express = require('express');
var router = express.Router();
var menu_dal = require('../dal/menu_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
    menu_dal.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('menu/menu_view_all', {menu: result});
        }
    })
});

router.get('/add', function(req, res) {
    res.render('menu/menu_add');
});

router.get('/insert', function(req, res) {
    menu_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/menu/all');
        }
    });
});

module.exports = router;
