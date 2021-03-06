module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var pageSchema = require('./page.schema.server')();

    var pageModel = mongoose.model('Pages', pageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        addWidgetToPage : addWidgetToPage,
        deleteWidgetFromPage : deleteWidgetFromPage,
        reorderWidget : reorderWidget
    };
    return api;

    function reorderWidget(pageId, start, end) {
        var deferred = q.defer();
        pageModel.findById(pageId, function (err, page) {
            page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0])
            page.markModified('widgets');
            page.save(function(err,page){
                    if(err){
                        deferred.abort();
                    }else{
                        deferred.resolve(page.widgets);
                    }
            });
        });
        return deferred.promise;
    }

    function deleteWidgetFromPage(pageId, widgetId) {
        var deferred = q.defer();
        pageModel
            .findById(pageId, function (err, page) {
                var index = page.widgets.indexOf(widgetId);
                page.widgets.splice(index, 1);
                page.save();
                deferred.resolve(page);
            });
        return deferred.promise;
    }

    function createPage(websiteId, page) {
        var deferred = q.defer();
        page._website = websiteId;
        pageModel.create(page, function (err, doc) {
            if(err) {
                deferred.abort();
            } else {
                deferred.resolve(doc._doc);
            }
        });
        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        pageModel
            .find({_website : websiteId}, function (err, pages) {
                deferred.resolve(pages);
            });
        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = q.defer();
        pageModel
            .findById(pageId)
            .exec(function(err, page){
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(page._doc);
                }
            });
        return deferred.promise;
    }
    
    function updatePage(pageId, page) {
        var deferred = q.defer();
        pageModel
            .findById(pageId, function (err, pag) {
                pag.name = page.name;
                pag.description = page.description;
                pag.save();
                deferred.resolve(pag);
            });
        return deferred.promise;
    }
    
    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel.findByIdAndRemove({_id: pageId}, function (err, status) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function addWidgetToPage(pageId, widgetId) {
        var deferred = q.defer();
        pageModel
            .findById(pageId, function (err, page) {
                page.widgets.push(widgetId);
                page.save();
                deferred.resolve(page);
            });
        return deferred.promise;
    }
};