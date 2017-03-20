module.exports = function () {
    var mongoose = require('mongoose');

    var actorSchema = mongoose.Schema({
        username : String,
        password : String,
        firstName : String,
        lastName : String,
        email : String,
        phone : String,
        dateCreated : { type: Date, default: Date.now },
        websites : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentWebsites'}]
    }, {collection: 'webdev.mongo.assignment.users'});

    return actorSchema;
};