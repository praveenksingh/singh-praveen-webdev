module.exports = function () {
    var mongoose = require('mongoose');

    var pageSchema = mongoose.Schema({
        _website : {type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentWebsites'},
        name : String,
        title : String,
        description : String,
        dateCreated : { type: Date, default: Date.now },
        widgets : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentWidgets'}]
    }, {collection: 'webdev.mongo.assignment.pages'});

    pageSchema.pre('remove',  function(next) {
        // console.log("called");
        this.model('Widgets').remove(
            {_id: {$in: this.widgets}}).exec();
    });

    return pageSchema;
};