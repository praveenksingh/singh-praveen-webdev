(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesByUser(vm.userId)
                .success(renderWebSites);
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(renderWebSite);
        }
        init();

        function renderWebSites(websites) {
            vm.websites = websites;
        }
        function renderWebSite(website) {
            vm.website = website
        }

        function updateWebsite(updatedWebsite) {
            var promise = WebsiteService.updateWebsite(vm.websiteId, updatedWebsite)
            promise.success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.error = "unable to update website";
                });
        }

        function deleteWebsite () {
            var promise = WebsiteService.deleteWebsite(vm.websiteId)
            promise.success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.error = "unable to delete website";
                });
        }
    }
})();