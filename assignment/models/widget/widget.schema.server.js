module.exports = function () {
    var mongoose = require('mongoose');

    var widgetSchema = mongoose.Schema({
        _page : {type: mongoose.Schema.Types.ObjectId, ref: 'WebdevMongoAssignmentPages'},
        type : String,
        name : String,
        text : String,
        placeholder : String,
        description : String,
        url : String,
        width : String,
        height : String,
        rows : Number,
        size : Number,
        class : String,
        icon : String,
        deletable : Boolean,
        formatted : Boolean,
        dateCreated : { type: Date, default: Date.now },
        widgets : Object
    }, {collection: 'webdev.mongo.assignment.widgets'});

    return widgetSchema;
};