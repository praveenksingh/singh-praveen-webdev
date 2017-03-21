module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server')();


    var websiteModel = mongoose.model('Websites', websiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        addPageToWebsite : addPageToWebsite,
        deletePageForWebsite : deletePageForWebsite
    };
    return api;

    function deletePageForWebsite(websiteId, pageId) {
        var deferred = q.defer();
        websiteModel
            .findById(websiteId, function (err, website) {
                var index = website.pages.indexOf(pageId);
                website.pages.splice(index, 1);
                website.save();
                deferred.resolve(website);
            });
        return deferred.promise;
    }

    function addPageToWebsite(websiteId, pageId) {
        var deferred = q.defer();
        websiteModel
            .findById(websiteId, function (err, website) {
                website.pages.push(pageId);
                website.save();
                deferred.resolve(website);
            });
        return deferred.promise;
    }

    function createWebsiteForUser(userId, website) {
        var deferred = q.defer();
        website._user = userId;
        websiteModel.create(website, function (err, doc) {
            if(err) {
                deferred.abort();
            } else {
                deferred.resolve(doc._doc);
            }
        });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        websiteModel
            .find({_user : userId}, function (err, websites) {
                deferred.resolve(websites);
            });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        websiteModel
            .findById(websiteId)
            .exec(function(err, website){
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(website._doc);
                }
            });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        websiteModel
            .findById(websiteId, function (err, webs) {
                webs.name = website.name;
                webs.description = website.description;
                webs.save();
                deferred.resolve(webs);
            });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        websiteModel.remove({_id: websiteId}, function (err, status) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

};