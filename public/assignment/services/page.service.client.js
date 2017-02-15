(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService(){

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "567", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "createPage": createPage,
            "updatePage": updatePage,
            "deletePage" : deletePage
        };
        return api;

        function findPageByWebsiteId(websiteId) {
            var webpages = [];
            for(var w in pages) {
                if(pages[w].websiteId === websiteId) {
                    webpages.push(pages[w]);
                }
            }
            return webpages;
        }

        function findPageById(pageId) {
            for(var w in pages) {
                if(pages[w]._id === pageId) {
                    return pages[w];
                }
            }
            return null;
        }

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime();
            pages.push(page);
        }

        function updatePage(pageId, page) {
            for(var w in pages) {
                if(pages[w]._id === pageId) {
                    pages[w].name = page.name;
                    pages[w].description = page.description;
                }
            }
        }

        function deletePage(pageId) {
            for(var w in pages) {
                if(pages[w]._id === pageId) {
                    pages.splice(w, 1);
                }
            }
        }
    }

})();