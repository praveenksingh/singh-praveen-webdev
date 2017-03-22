module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var widgetSchema = require('./widget.schema.server')();

    var widgetModel = mongoose.model('Widgets', widgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        var deferred = q.defer();
        widget._page = pageId;
        widgetModel.create(widget, function (err, doc) {
            if(err) {
                deferred.abort();
            } else {
                deferred.resolve(doc._doc);
            }
        });
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();
        widgetModel
            .find({_page : pageId}, function (err, widgets) {
                deferred.resolve(widgets);
            });
        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        widgetModel
            .findById(widgetId)
            .exec(function(err, widget){
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(widget._doc);
                }
            });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        widgetModel
            .findById(widgetId, function (err, webs) {
                for(var k in widget)
                    webs[k]=widget[k];
                webs.save();
                deferred.resolve(webs);
            });
        return deferred.promise;

    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        widgetModel.findByIdAndRemove({_id: widgetId}, function (err, status) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
    
    function reorderWidget(pageId, start, end) {
        
    }
};