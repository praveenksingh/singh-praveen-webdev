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
        // console.log("called");
        var pages = this.model('Pages');
        // this.model('Pages').remove(
        //     {_id: {$in: this.pages}}).exec();
        pages.find({_website: this._id})
            .exec(function(err, pagesList){
                if(err) {
                    deferred.abort(err);
                } else {
                    for(var p in pagesList) {
                        pagesList[p].remove();
                        pages.remove({_id: pagesList[p]._id}).exec();
                    }
                }
            });
        next();

    });
    return websiteSchema;
};