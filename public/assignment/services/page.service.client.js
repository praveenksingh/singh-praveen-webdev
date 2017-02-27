(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http){

        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "createPage": createPage,
            "updatePage": updatePage,
            "deletePage" : deletePage
        };
        return api;

        function updatePage(pageId, newPage) {
            return $http.put("/api/page/"+pageId, newPage);
        }

        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId);
        }
        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
        }

        function createPage(websiteId, page) {
            return $http.post("/api/website/"+websiteId+"/page", page);
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/"+websiteId+"/page");
        }
    }

})();