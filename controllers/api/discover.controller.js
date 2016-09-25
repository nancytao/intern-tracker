var config = require('config.json');
var express = require('express');
var router = express.Router();
var discoverService = require('services/discover.service');

//routes
router.get('/api/discover/', getCompanies);

module.exports = router;

function getCompanies(req, res) {
    discoverService.getAll({}, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
