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

    actorSchema.pre('remove',  function(next) {
        var websites = this.model('Websites');
        websites.find({_user: this._id})
            .exec(function(err, website){
                if(err) {
                    deferred.abort(err);
                } else {
                    for(var w in website) {
                        website[w].remove();
                        websites.remove({_id: website[w]._id}).exec();
                    }
                }
            });
        next();
    });

    return actorSchema;
};