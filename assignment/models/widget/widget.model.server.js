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

    }

    function updateWidget(widgetId, widget) {

    }

    function deleteWidget(widgetId) {

    }
    
    function reorderWidget(pageId, start, end) {
        
    }
};