module.exports = function () {
    var mongoose = require('mongoose');

    var actorSchema = mongoose.Schema({
        _id: Number,
        username : String,
        password : String,
        firstName : String,
        lastName : String,
        emailId : String
    }, {collection: 'webdev.mongo.assignment.users'});

    return actorSchema;
};