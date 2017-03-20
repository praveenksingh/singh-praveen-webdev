module.exports = function () {
    var mongoose = require('mongoose');

    var pageSchema = mongoose.Schema({
        _website : {type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentWebsites'},
        name : String,
        title : String,
        description : String,
        dateCreated : { type: Date, default: Date.now },
        widgets : Object
    }, {collection: 'webdev.mongo.assignment.pages'});

    return pageSchema;
};