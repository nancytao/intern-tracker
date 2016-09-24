var config = require('config.json');
var express = require('express');
var router = express.Router();
var offerService = require('services/offer.service');

//routes
router.get('/api/offers', getOffers);
router.post('/api/addoffer', addOffer);

module.exports = router;

function getOffers(req, res) {
    offerService.getOffers(req.user.sub)
        .then(function(user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}