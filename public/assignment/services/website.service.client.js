(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService($http) {
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite,
            "findAllWebsitesByUser": findAllWebsitesByUser
        };
        return api;

        function updateWebsite(websiteId, newWebsite) {
            return $http.put("/api/website/"+websiteId, newWebsite);
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/"+websiteId);
        }
        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }

        function createWebsite(userId, website) {
            return $http.post("/api/user/" + userId + "/website", website);
        }

        function findAllWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }
    }
})();