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
        websites.findOne({_user: this._id})
            .exec(function(err, website){
                if(err) {
                    deferred.abort(err);
                } else {
                    website.remove();
                    websites.remove({_id: website._id}).exec();
                }
            });
        next();
    });

    return actorSchema;
};