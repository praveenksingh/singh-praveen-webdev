module.exports = function () {
    var mongoose = require('mongoose');

    var websiteSchema = mongoose.Schema({
        _user : {type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentUsers'},
        name : String,
        description : String,
        dateCreated : { type: Date, default: Date.now },
        pages : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentPages'}]
    }, {collection: 'webdev.mongo.assignment.websites'});

    websiteSchema.pre('remove',  function(next) {
        console.log("called");
        this.model('Pages').remove(
            {_id: {$in: this.pages}}).exec();
    });
    return websiteSchema;
};