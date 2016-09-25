var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('discover');

var service = {};

service.getById = getById;
service.getAll = getAll;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.discover.find({}, function(err, com) {
        if (err) deferred.reject(err);

        if (com) {
            deferred.resolve(_.omit(com, 'hash'));
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise();
}

function getById(_id) {
    var deferred = Q.defer();

    db.discover.findById(_id, function (err, com) {
        if (err) deferred.reject(err);

        if (com) {
            //return company
            deferred.resolve(_.omit(com, 'hash'));
        } else {
            //company not found
            deferred.resolve();
        }
    });
    return deferred.promise;
}

// function update(_id, userParam) {
//     var deferred = Q.defer();

//     // validation
//     db.users.findById(_id, function (err, user) {
//         if (err) deferred.reject(err);

//         if (user.username !== userParam.username) {
//             // username has changed so check if the new username is already taken
//             db.users.findOne(
//                 { username: userParam.username },
//                 function (err, user) {
//                     if (err) deferred.reject(err);

//                     if (user) {
//                         // username already exists
//                         deferred.reject('Username "' + req.body.username + '" is already taken')
//                     } else {
//                         updateUser();
//                     }
//                 });
//         } else {
//             updateUser();
//         }
//     });

//     function updateUser() {
//         // fields to update
//         var set = {
//             firstName: userParam.firstName,
//             lastName: userParam.lastName,
//             username: userParam.username,
//             internships: userParam.internships,
//             internshipCount: userParam.internshipCount,
//         };
//         // update password if it was entered
//         if (userParam.password) {
//             set.hash = bcrypt.hashSync(userParam.password, 10);
//         }

//         db.users.update(
//             { _id: mongo.helper.toObjectID(_id) },
//             { $set: set },
//             function (err, doc) {
//                 if (err) deferred.reject(err);

//                 deferred.resolve();
//             });
//     }

//     return deferred.promise;
// }

// // prefixed function name with underscore because 'delete' is a reserved word in javascript
// function _delete(_id) {
//     var deferred = Q.defer();
//     db.users.remove(
//         { _id: mongo.helper.toObjectID(_id) },
//         function (err) {
//             if (err) deferred.reject(err);

//             deferred.resolve();
//         });

//     return deferred.promise;
// }