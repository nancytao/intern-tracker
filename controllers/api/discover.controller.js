var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/discover.service');

//routes
router.get('/current', getCurrentUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);

module.exports = router;
