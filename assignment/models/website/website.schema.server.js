module.exports = function () {
    var mongoose = require('mongoose');

    var websiteSchema = mongoose.Schema({
        _user : {type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentUsers'},
        name : String,
        description : String,
        dateCreated : { type: Date, default: Date.now },
        pages : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentPages'}]
    }, {collection: 'webdev.mongo.assignment.websites'});

    return websiteSchema;
};