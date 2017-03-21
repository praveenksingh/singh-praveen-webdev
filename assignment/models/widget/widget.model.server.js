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

    }

    function findAllWidgetsForPage(pageId) {

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