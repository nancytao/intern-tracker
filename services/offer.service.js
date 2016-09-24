var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('users');

var service = {};

service.getOffers = getOffers;
service.addOffer = addOffer;

module.exports = service;

function getOffers(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user) {
            //return user
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            //user not found
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function addOffer(offerParam) {
    var deferred = Q.defer();

    db.users.update({user:offerParam.username}, {offer:offerParam});
}
